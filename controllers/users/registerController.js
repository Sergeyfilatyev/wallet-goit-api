const { User } = require("../../models");
const { RequestError } = require("../../helpers");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const { sendEmail, verificationEmail } = require("../../services/sendEmail");
const { FRONTEND_URL, USER_MAIL } = process.env;

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
    FRONTEND_URL,
    USER_MAIL
  );
  await sendEmail(mailInfo);

  res.status(201).json({
    status: 201,
    message: "User created",
    data: {
      name: newUser.name,
      email: newUser.email,
    },
  });
};
module.exports = registerContoller;
