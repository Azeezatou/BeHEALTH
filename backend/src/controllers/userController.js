const { prisma } = require("../config/prisma");

async function me(req, res) {
  const user = await prisma.user.findUnique({
    where: { id: req.user.sub },
    select: {
      id: true,
      email: true,
      role: true,
      isEmailVerified: true,
      profile: true
    }
  });

  return res.json({ user });
}

async function updateMe(req, res) {
  const profile = await prisma.profile.upsert({
    where: { userId: req.user.sub },
    update: req.body,
    create: { ...req.body, userId: req.user.sub }
  });

  return res.json({ profile });
}

async function updateWallet(req, res) {
  const profile = await prisma.profile.upsert({
    where: { userId: req.user.sub },
    update: { walletAddress: req.body.walletAddress },
    create: { userId: req.user.sub, walletAddress: req.body.walletAddress }
  });

  return res.json({ profile });
}

module.exports = { me, updateMe, updateWallet };
