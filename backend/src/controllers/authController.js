const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { prisma } = require("../config/prisma");
const { env } = require("../config/env");
const { randomToken, signAccessToken, signRefreshToken } = require("../utils/tokens");
const {
  sendPasswordResetEmail,
  sendVerificationEmail
} = require("../services/emailService");

async function register(req, res) {
  const { email, password, role } = req.validated.body;
  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) return res.status(409).json({ message: "Email already registered" });

  const emailVerifyToken = randomToken();
  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      role,
      emailVerifyToken,
      profile: { create: {} }
    },
    select: { id: true, email: true, role: true, isEmailVerified: true }
  });

  await sendVerificationEmail(user, emailVerifyToken);
  return res.status(201).json({ user, message: "Check your email to verify your account" });
}

async function login(req, res) {
  const { email, password } = req.validated.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  return res.json({
    user: { id: user.id, email: user.email, role: user.role, isEmailVerified: user.isEmailVerified },
    accessToken: signAccessToken(user),
    refreshToken: signRefreshToken(user)
  });
}

async function refresh(req, res) {
  const payload = jwt.verify(req.validated.body.refreshToken, env.jwtRefreshSecret);
  const user = await prisma.user.findUnique({ where: { id: payload.sub } });
  if (!user) return res.status(401).json({ message: "Invalid refresh token" });
  return res.json({ accessToken: signAccessToken(user) });
}

async function logout(req, res) {
  return res.status(204).send();
}

async function verifyEmail(req, res) {
  const user = await prisma.user.findFirst({ where: { emailVerifyToken: req.params.token } });
  if (!user) return res.status(404).json({ message: "Verification token not found" });

  await prisma.user.update({
    where: { id: user.id },
    data: { isEmailVerified: true, emailVerifyToken: null }
  });

  return res.json({ message: "Email verified" });
}

async function forgotPassword(req, res) {
  const user = await prisma.user.findUnique({ where: { email: req.validated.body.email } });
  if (user) {
    const token = randomToken();
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: token,
        resetPasswordExpires: new Date(Date.now() + 60 * 60 * 1000)
      }
    });
    await sendPasswordResetEmail(user, token);
  }

  return res.json({ message: "If the email exists, a reset link has been sent" });
}

async function resetPassword(req, res) {
  const { token, newPassword } = req.validated.body;
  const user = await prisma.user.findFirst({
    where: {
      resetPasswordToken: token,
      resetPasswordExpires: { gt: new Date() }
    }
  });

  if (!user) return res.status(400).json({ message: "Invalid or expired reset token" });

  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordHash: await bcrypt.hash(newPassword, 12),
      resetPasswordToken: null,
      resetPasswordExpires: null
    }
  });

  return res.json({ message: "Password reset successful" });
}

module.exports = {
  forgotPassword,
  login,
  logout,
  refresh,
  register,
  resetPassword,
  verifyEmail
};
