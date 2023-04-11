const { User } = require("../../models");
const { RequestError, sendEmail } = require("../../helpers");

const { BASE_URL, USER_MAIL } = process.env;

const resendEmailController = async (req, res) => {
  const { email } = req.body;
  const user = User.findOne({ email });
  if (!user) {
    throw RequestError(404, "User not found");
  }
  const verificationEmail = {
    from: "walletua@meta.ua",
    to: email,
    subject: "Verify registration",
    text: "Click to confirm registration",
    html: `<div style="background-color: #f2f2f2; padding: 20px;">
      <h2 style="color: #333; font-family: Arial, sans-serif;">Site registration confirmation</h2>
      <p style="color: #333; font-family: Arial, sans-serif;">Click the button below to confirm your registration:</p>
      <a target="_blank" style="background-color: #008CBA; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-family: Arial, sans-serif;" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Confirm Registration</a>
    </div>`,
  };
  await sendEmail(verificationEmail);
  res.status(200).json({
    message: "Email verify success",
  });
};

module.exports = resendEmailController;
