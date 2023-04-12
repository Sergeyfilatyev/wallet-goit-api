const bCrypt = require("bcryptjs");

const { generateTokens } = require("../../services/tokenService");

const { RequestError } = require("../../helpers");
const { User } = require("../../models");

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw RequestError(401, "Email or password is wrong");
  }

  const passwordCompare = bCrypt.compareSync(password, user.password);

  if (!user.verify) {
    throw RequestError(400, "User not verified!");
  }

  if (!user || !passwordCompare) {
    throw RequestError(401, "Email or password is wrong");
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
  });

  return res.status(200).json({
    message: "You have successfully logged in",
    token: tokens.accessToken,
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
};

module.exports = loginController;
