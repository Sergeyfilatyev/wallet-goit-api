const { User } = require("../../models/");

const logoutController = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });
  res.clearCookie("refreshToken");

  res.status(204).json({
    message: "Logout successful",
  });
};

module.exports = logoutController;
