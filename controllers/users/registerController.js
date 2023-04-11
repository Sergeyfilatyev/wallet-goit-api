const { User } = require("../../models");
const { RequestError } = require("../../helpers");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const { generateTokens } = require("../../services/tokenService");
const { sendEmail, verificationEmail } = require("../../services/sendEmail");
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
  const mailInfo = verificationEmail(
    email,
    verificationToken,
    BASE_URL,
    USER_MAIL
  );
  await sendEmail(mailInfo);

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
