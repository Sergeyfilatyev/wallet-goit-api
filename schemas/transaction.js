const Joi = require("joi");

const addTransaction = Joi.object({
  income: Joi.boolean().required(),
  amount: Joi.number().required(),
  category: Joi.when("income", {
    is: true,
    then: Joi.string().valid("income").required(),
    otherwise: Joi.string().valid(
      "main",
      "products",
      "car",
      "self care",
      "children",
      "house",
      "education",
      "leisure",
      "other"
    ),
  }),

  comment: Joi.string().allow(""),
  date: Joi.object({
    time: Joi.string(),
    day: Joi.number(),
    month: Joi.number(),
    year: Joi.number(),
  }),
});

const editTransaction = Joi.object({
  income: Joi.boolean(),
  amount: Joi.number(),
  category: Joi.when("income", {
    is: true,
    then: Joi.string().valid("income").required(),
    otherwise: Joi.string().valid(
      "main",
      "products",
      "car",
      "self care",
      "children",
      "house",
      "education",
      "leisure",
      "other"
    ),
  }),
  comment: Joi.string().allow(""),
  date: Joi.object({
    time: Joi.string(),
    day: Joi.number(),
    month: Joi.number(),
    year: Joi.number(),
  }),
}).min(1);

module.exports = {
  addTransaction,
  editTransaction,
};
