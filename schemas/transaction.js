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
  comment: Joi.string(),
  date: Joi.object({
    time: Joi.number(),
    day: Joi.number(),
    month: Joi.number(),
    year: Joi.number(),
  }),
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
  date: Joi.object({
    time: Joi.number(),
    day: Joi.number(),
    month: Joi.number(),
    year: Joi.number(),
  }),
}).min(1);

module.exports = {
  addTransaction,
  editTransaction,
};
