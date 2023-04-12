const { Transaction } = require("../../models");
const { RequestError } = require("../../helpers");

const getTransactionController = async (req, res) => {
  const { transactionId: id } = req.params;
  const { _id: owner } = req.user;
  
  const data = await Transaction.findOne({ _id: id, owner });
  if (!data) {
    throw RequestError(404, `id:${id} not found`);
  }

  res.status(200).json({ message: "Successful operation", data: data });
};

module.exports = getTransactionController;
