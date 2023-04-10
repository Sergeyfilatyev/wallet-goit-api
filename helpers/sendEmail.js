const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD, BASE_URL } = process.env;

const sendEmail = async (email, verificationToken) => {
  const transport = nodemailer.createTransport({
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
      user: "walletua@meta.ua",
      pass: META_PASSWORD,
    },
  });
  const verificationEmail = {
    from: "walletua@meta.ua",
    to: email,
    subject: "Verify registration",
    text: "Click to confirm registration",
    html: `<a href="${BASE_URL}/api/users/verify/${verificationToken}">Confirm Registration</a>`,
  };
  await transport.sendMail(verificationEmail);
};

module.exports = sendEmail;
