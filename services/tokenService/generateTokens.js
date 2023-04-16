const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: "15s" });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
    expiresIn: "30d",
  });
  return {
    accessToken,
    refreshToken,
  };
};

module.exports = generateTokens;
