const jwt = require("jsonwebtoken");
const { validateAccessToken } = require("../services/tokenService");
const { RequestError } = require("../helpers");

const { User } = require("../models");

const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer = "", token = ""] = authorization.split(" ");
    if (bearer !== "Bearer" || !token) {
      throw RequestError(401);
    }
    try {
      const { id } = validateAccessToken(token);
      const user = await User.findById(id);
      if (!user || !user.token) {
        throw RequestError(401);
      }
      req.user = user;
      next();
    } catch (error) {
      throw RequestError(401, error.message);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
