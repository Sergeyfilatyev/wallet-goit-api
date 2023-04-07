const jwt = require("jsonwebtoken");
const RequestError = require("../helpers");
const { SECRET_KEY } = process.env;
const { User } = require("../models");

const authentificate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const [bearer, token] = authorization.split(" ");

    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) {
      throw RequestError(401, "AUTHENTIFICATE");
    }
    if (bearer !== "Bearer") {
      throw RequestError(401, "AUTHENTIFICATE");
    }
    req.user = user;
    next();
  } catch (error) {
    if (!error.status) {
      error.status = 401;
      error.message = "Unauthorized";
    }
    next(error);
  }
};

module.exports = authentificate;
