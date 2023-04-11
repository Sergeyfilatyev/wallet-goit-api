const generateTokens = require("./generateTokens");
const {
  validateAccessToken,
  validateRefreshToken,
} = require("./validateTokens");

module.exports = { generateTokens, validateAccessToken, validateRefreshToken };
