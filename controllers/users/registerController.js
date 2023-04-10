const { User } = require("../../models");
const { RequestError, sendEmail } = require("../../helpers");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

const { BASE_URL } = process.env;

const registerContoller = async (req, res) => {
  const { name, password, email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Provided email already in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = uuidv4();
  console.log(verificationToken);
  const newUser = await User.create({
    name,
    password: hashPassword,
    email,
    verificationToken,
  });
  if (!newUser) {
    throw RequestError(400, "Invalid request body");
  }
  // const verificationEmail = {
  //   from: "walletua@meta.ua",
  //   to: email,
  //   subject: "Verify registration",
  //   text: "Click to confirm registration",
  //   html: `<div style="background-color: #f2f2f2; padding: 20px;">
  //     <h2 style="color: #333; font-family: Arial, sans-serif;">Site registration confirmation</h2>
  //     <p style="color: #333; font-family: Arial, sans-serif;">Click the button below to confirm your registration:</p>
  //     <a target="_blank" style="background-color: #008CBA; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-family: Arial, sans-serif;" href="${BASE_URL}/api/users/verify/${verificationToken}">Confirm Registration</a>
  //   </div>`,
  // };

  await sendEmail(email, verificationToken);

  res.status(201).json({
    message: "User created",
    user: {
      name: newUser.name,
      email: newUser.email,
    },
  });
};
module.exports = registerContoller;
