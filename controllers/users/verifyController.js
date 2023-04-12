const { User } = require("../../models");
const { RequestError } = require("../../helpers");
const { generateTokens } = require("../../services/tokenService");

const verifyController = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw RequestError(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });

  const payload = {
    id: user._id,
    name: user.name,
  };

  const tokens = generateTokens(payload);

  user.token = tokens.refreshToken;
  user.save();

  res.cookie("refreshToken", tokens.refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });

  res.status(200).json({
    message: "User verified",
    data: {
      name: user.name,
      email: user.email,
      token: tokens.accessToken,
    },
  });
};

module.exports = verifyController;
