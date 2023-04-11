const { User } = require("../../models");
const { RequestError } = require("../../helpers");
const bcrypt = require("bcryptjs");
const { generateTokens } = require("../../services");

const registerContoller = async (req, res) => {
  const { name, password, email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw RequestError(409, "Provided email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ name, password: hashPassword, email });
  if (!newUser) {
    res.status(400);
    throw new Error("Invalid request body");
  }

  const payload = {
    id: newUser._id,
    name: newUser.name,
  };

  const tokens = generateTokens(payload);

  newUser.token = tokens.refreshToken;

  res.cookie("refreshToken", tokens.refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });

  res.status(201).json({
    message: "User created",
    data: {
      name: newUser.name,
      email: newUser.email,
      token: tokens.accessToken,
    },
  });
};
module.exports = registerContoller;
