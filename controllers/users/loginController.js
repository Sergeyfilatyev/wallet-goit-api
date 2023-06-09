const bCrypt = require("bcryptjs");

const { generateTokens } = require("../../services/tokenService");

const { RequestError } = require("../../helpers");
const { User } = require("../../models");

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw RequestError(403, "Email or password is wrong");
  }

  const passwordCompare = bCrypt.compareSync(password, user.password);

  if (!user.verify) {
    return res.status(400).json({
      status: 400,
      email,
      message: "User not verified!",
    });
  }

  if (!user || !passwordCompare) {
    throw RequestError(403, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
    name: user.name,
  };

  const tokens = generateTokens(payload);

  await User.findByIdAndUpdate(user._id, { token: tokens.refreshToken });

  res.cookie("refreshToken", tokens.refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  return res.status(200).json({
    message: "You have successfully logged in",
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      token: tokens.accessToken,
    },
  });
};

module.exports = loginController;
