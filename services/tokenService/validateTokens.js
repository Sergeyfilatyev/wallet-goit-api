const jwt = require("jsonwebtoken");
const { SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const validateAccessToken = (token) => {
  try {
    const userData = jwt.verify(token, SECRET_KEY);
    return userData;
  } catch (error) {
    return null;
  }
};

const validateRefreshToken = (token) => {
  try {
    const userData = jwt.verify(token, REFRESH_SECRET_KEY);
    return userData;
  } catch (error) {
    return null;
  }
};

module.exports = {
  validateAccessToken,
  validateRefreshToken,
};
