const { RequestError } = require("../../helpers");
const {
  validateRefreshToken,
  generateTokens,
} = require("../../services/tokenService");
const { User } = require("../../models");

const refreshController = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw RequestError(401, "Unauthorized!");
  }

  const userData = validateRefreshToken(refreshToken);
  const userWithToken = await User.findOne({ _id: userData.id });

  if (!userData || !userWithToken || !userWithToken.verify) {
    throw RequestError(401, "Unauthorized!");
  }

  const payload = {
    id: userWithToken._id,
    name: userWithToken.name,
  };
  const tokens = generateTokens(payload);

  userWithToken.token = tokens.refreshToken;
  userWithToken.save();

  res.cookie("refreshToken", tokens.refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  return res.status(200).json({
    message: "Refreshed successfully!",
    data: {
      id: userWithToken._id,
      name: userWithToken.name,
      email: userWithToken.email,
      token: tokens.accessToken,
    },
  });
};

module.exports = refreshController;
