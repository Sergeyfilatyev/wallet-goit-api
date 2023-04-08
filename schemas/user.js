const Joi = require("joi");

const emailRegex =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?.,\/\-_&])[A-Za-z\d@$!%*?.,\/\-_&]{8,}$/; //Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:

const registerUserSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().pattern(passRegex).required(),
  name: Joi.string().min(2).max(15).required(),
});

const loginUserSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().pattern(passRegex).required(),
});

module.exports = {
  registerUserSchema,
  loginUserSchema,
};
