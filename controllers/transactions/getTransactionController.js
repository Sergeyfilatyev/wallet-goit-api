const { Transaction } = require("../../models");
const { RequestError } = require("../../helpers");

const getTransactionController = async (req, res) => {
  const { id } = req.params;
  const data = await Transaction.findOne({ _id: id });
  if (!data) {
    throw RequestError(404, `id:${id} not found`);
  }

  res.status(200).json({ message: "Successful operation", data: data });
};

module.exports = getTransactionController;
