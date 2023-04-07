const Joi = require("joi");

const addTransaction = Joi.object({
  type: Joi.boolean().required(),
  amount: Joi.number().required(),
  category: Joi.string()
    .valid(
      "main expenses",
      "products",
      "car",
      "self care",
      "child care",
      "household products",
      "education",
      "leisure",
      "other expenses"
    )
    .required(),
  comment: Joi.string(),
  //date: Joi.date().required(),
});

const editTransaction = Joi.object({
  type: Joi.boolean(),
  amount: Joi.number(),
  category: Joi.string().valid(
    "main expenses",
    "products",
    "car",
    "self care",
    "child care",
    "household products",
    "education",
    "leisure",
    "other expenses"
  ),
  comment: Joi.string(),
  date: Joi.date(),
}).min(1);

module.exports = {
  addTransaction,
  editTransaction,
};
