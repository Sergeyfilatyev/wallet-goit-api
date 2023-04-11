const verificationEmail = (email, verificationToken, BASE_URL, USER_MAIL) => {
  return {
    from: USER_MAIL,
    to: email,
    subject: "Verify registration",
    text: "Click to confirm registration",
    html: `<div style="background-color: #f2f2f2; padding: 20px;">
      <h2 style="color: #333; font-family: Arial, sans-serif;">Site registration confirmation</h2>
      <p style="color: #333; font-family: Arial, sans-serif;">Click the button below to confirm your registration:</p>
      <a target="_blank" style="background-color: #008CBA; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-family: Arial, sans-serif;" href="${BASE_URL}/api/users/verify/${verificationToken}">Confirm Registration</a>
    </div>`,
  };
};
module.exports = verificationEmail;
