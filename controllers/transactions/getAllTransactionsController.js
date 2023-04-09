const { Transaction } = require("../../models");
const { RequestError } = require("../../helpers");

const getAllTransactionsController = async (req, res) => {
  const { _id: owner } = req.user;
  const allTransactions = await Transaction.find({ owner: owner });

  if (!allTransactions) {
    throw RequestError(404, "Not found");
  }

  return res.status(200).json({ data: allTransactions });
};

module.exports = getAllTransactionsController;
