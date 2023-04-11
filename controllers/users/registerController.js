const { User } = require("../../models");
const { RequestError, sendEmail } = require("../../helpers");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const { generateTokens } = require("../../services");

const { BASE_URL, USER_MAIL } = process.env;

const registerContoller = async (req, res) => {
  const { name, password, email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw RequestError(409, "Provided email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = uuidv4();
  const newUser = await User.create({
    name,
    password: hashPassword,
    email,
    verificationToken,
  });
  if (!newUser) {
    throw RequestError(400, "Invalid request body");
  }

  const verificationEmail = {
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
  await sendEmail(verificationEmail);

  res.status(201).json({
    message: "User created",
    user: {
      name: newUser.name,
      email: newUser.email,


  const payload = {
    id: newUser._id,
    name: newUser.name,
  };

  const tokens = generateTokens(payload);

  newUser.token = tokens.refreshToken;

  res.cookie("refreshToken", tokens.refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
  res.status(201).json({
    message: "User created",
    data: {
      name: newUser.name,
      email: newUser.email,
      token: tokens.accessToken,
    },
  });
};
module.exports = registerContoller;
