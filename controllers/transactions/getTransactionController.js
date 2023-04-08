const { Transaction } = require("../../models");
const { RequestError } = require("../../helpers");

const getTransactionController = async (req, res) => {
  const { transactionId } = req.params;
  const data = await Transaction.findOne({ _id: transactionId });
  if (!data) {
    throw RequestError(404, `id:${transactionId} not found`);
  }

  res.status(200).json({ message: "Success", data });
};

module.exports = getTransactionController;
