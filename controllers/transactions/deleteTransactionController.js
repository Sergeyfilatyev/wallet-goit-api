const { Transaction } = require("../../models");
const { RequestError } = require("../../helpers");

const deleteTransactionController = async (req, res) => {
  const { transactionId: id } = req.params;
  const removedTransaction = await Transaction.findByIdAndRemove(id);
  if (!removedTransaction) {
    throw RequestError(400, "Not found!");
  }

  return res.status(200).json({
    message: "Transaction removed",
  });
};

module.exports = deleteTransactionController;
