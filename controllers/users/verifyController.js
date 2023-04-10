const { User } = require("../../models");
const { RequestError } = require("../../helpers");

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

  res.status(200).json({
    message: "Email verify success",
  });
};

module.exports = verifyController;
