const Joi = require("joi");

const addTransaction = Joi.object({
  income: Joi.boolean().required(),
  amount: Joi.number().required(),
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
  date: Joi.object(),
  comment: Joi.string(),
});

const editTransaction = Joi.object({
  income: Joi.boolean(),
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
}).min(1);

module.exports = {
  addTransaction,
  editTransaction,
};
