const nodemailer = require("nodemailer");
require("dotenv").config();

const { USER_MAIL, HOST_MAIL, PORT_MAIL, PASS_MAIL } = process.env;

const sendEmail = async (email) => {
  const transport = nodemailer.createTransport({
    host: HOST_MAIL,
    port: PORT_MAIL,
    secure: false,
    auth: {
      user: USER_MAIL,
      pass: PASS_MAIL,
    },
  });
  await transport.sendMail(email);
};

module.exports = sendEmail;
