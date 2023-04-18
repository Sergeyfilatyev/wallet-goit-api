const { User } = require("../../models");
const { RequestError } = require("../../helpers");
const { sendEmail, verificationEmail } = require("../../services/sendEmail");
const { FRONTEND_URL, USER_MAIL } = process.env;

const resendEmailController = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(404, "User not found");
  }
  const mailInfo = verificationEmail(
    email,
    user.verificationToken,
    FRONTEND_URL,
    USER_MAIL
  );
  await sendEmail(mailInfo);
  res.status(200).json({
    message: "Email verify success",
  });
};

module.exports = resendEmailController;
