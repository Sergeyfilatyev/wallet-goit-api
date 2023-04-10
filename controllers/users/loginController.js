require("dotenv").config();

const bCrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const { RequestError } = require("../../helpers");
const { User } = require("../../models");

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  const passwordCompare = await bCrypt.compareSync(password, user.password);

  if (!user.verify) {
    throw RequestError(400, "User not verified!");
  }

  if (!user || !passwordCompare) {
    throw RequestError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token });

  return res.status(200).json({
    message: "You have successfully logged in",
    token,
    user: {
      name: user.name,
      email: user.email,
    },
  });
};

module.exports = loginController;
