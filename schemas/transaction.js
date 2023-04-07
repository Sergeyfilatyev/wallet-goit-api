const Joi = require("joi");

const addIncomeTransaction = Joi.object({
  type: Joi.boolean().required(),
  amount: Joi.number().required(),
  category: Joi.string(),
  comment: Joi.string(),
  date: Joi.date().required(),
});

const addExpenceTransaction = Joi.object({
  type: Joi.boolean().required(),
  amount: Joi.number().required(),
  category: Joi.string().required(), //add existing categories
  comment: Joi.string(),
  date: Joi.date().required(),
});

const editTransaction = Joi.object({
  id: Joi.string().required(),
  type: Joi.boolean(),
  amount: Joi.number(),
  category: Joi.string(), //add existing categories
  comment: Joi.string(),
  date: Joi.date(),
});
//at least one of the fields should be edited

const deleteTransaction = Joi.object({
  id: Joi.string().required(),
});

module.exports = {
  addIncomeTransaction,
  addExpenceTransaction,
  editTransaction,
  deleteTransaction,
};
