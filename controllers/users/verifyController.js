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
    token,
  });

  res.redirect(`${process.env.FRONTEND_URL}/dashboard?token=${token}`);
};

module.exports = verifyController;
