const { Transaction } = require("../../models");
const { RequestError } = require("../../helpers");

const addTransactionController = async (req, res) => {
  const { _id: owner } = req.user;
  const newTransaction = await Transaction.create({ ...req.body, owner });

  if (!newTransaction) {
    throw RequestError(400, "Transaction creation faild");
  }

  return res.status(201).json(newTransaction);
};

module.exports = addTransactionController;
