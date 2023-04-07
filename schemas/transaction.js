const Joi = require("joi");

const addTransaction = Joi.object({
  type: Joi.boolean().required(),
  amount: Joi.number().required(),
  category: Joi.string().required(), //add existing categories
  comment: Joi.string(),
  //date: Joi.date().required(),
});

const editTransaction = Joi.object({
  type: Joi.boolean(),
  amount: Joi.number(),
  category: Joi.string(), //add existing categories
  comment: Joi.string(),
  date: Joi.date(),
});
//at least one of the fields should be edited

module.exports = {
  addTransaction,
  editTransaction,
};
