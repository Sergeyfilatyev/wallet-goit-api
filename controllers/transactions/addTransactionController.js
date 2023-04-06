const { Transaction } = require("../../models");

const addTransactionController = async (req, res) => {
  const newTransaction = await Transaction.create(req.body);

  if (!newTransaction) {
    return res.status(400).json({ message: "Transaction creation failure" });
  }

  return res.status(201).json(newTransaction);
};

module.exports = addTransactionController;
