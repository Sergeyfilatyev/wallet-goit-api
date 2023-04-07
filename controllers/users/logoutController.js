const { User } = require("../../models/");

const logoutController = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(200).json({
    message: "Logout successful",
  });
  // const logout = async (id) => {
  //   const user = await User.findOne({ id });

  //   if (!user) {
  //     return res.status(401).json({
  //       status: "error",
  //       code: 401,
  //       message: "Not authorized",
  //     });
  //   }
  //   try {
  //     user.token = null;
  //     await user.save();

  //     return res.status(202).json({
  //       message: "Logout successful",
  //     });
  //   } catch (err) {
  //     console.error(err.message);
  //     return res.status(500).json({
  //       status: "error",
  //       code: 500,
  //       message: "Internal server error",
  //     });
  //   }
  // };

  // logout(id);
};

module.exports = logoutController;
