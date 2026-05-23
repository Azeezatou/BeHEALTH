const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { env } = require("../config/env");

function signAccessToken(user) {
  return jwt.sign({ sub: user.id, role: user.role }, env.jwtAccessSecret, {
    expiresIn: env.jwtAccessExpiresIn
  });
}

function signRefreshToken(user) {
  return jwt.sign({ sub: user.id, role: user.role }, env.jwtRefreshSecret, {
    expiresIn: env.jwtRefreshExpiresIn
  });
}

function randomToken() {
  return crypto.randomBytes(32).toString("hex");
}

module.exports = { randomToken, signAccessToken, signRefreshToken };
