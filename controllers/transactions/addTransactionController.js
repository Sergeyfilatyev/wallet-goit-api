const { Transaction } = require("../../models");
const { RequestError } = require("../../helpers");

const addTransactionController = async (req, res) => {
  const newTransaction = await Transaction.create(req.body);

  if (!newTransaction) {
    throw RequestError(400, "Transaction creation faild");
  }

  return res.status(201).json(newTransaction);
};

module.exports = addTransactionController;
