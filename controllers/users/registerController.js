const { User } = require("../../models");
const { RequestError } = require("../../helpers");
const bcrypt = require("bcryptjs");

const registerContoller = async (req, res) => {
  const { name, password, email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Provided email already exists");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ name, password: hashPassword, email });
  if (!newUser) {
    res.status(400);
    throw new Error("Cannot save user!");
  }
  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
  });
};
module.exports = registerContoller;
