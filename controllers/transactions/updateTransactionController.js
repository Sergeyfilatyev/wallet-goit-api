const { Transaction } = require("../../models");

const updateTransactionController = async (req, res) => {
  const { transactionId: id } = req.params;
  const updatedTransaction = await Transaction.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updatedTransaction) {
    return res.status(404).json({ message: "Not found" });
  }

  return res.status(200).json(updatedTransaction);
};

module.exports = updateTransactionController;
