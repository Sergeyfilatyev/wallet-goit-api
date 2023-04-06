const { Transaction } = require("../../models");
const { RequestError } = require("../../helpers");

const updateTransactionController = async (req, res) => {
  const { transactionId: id } = req.params;
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedTransaction) {
      throw RequestError(404, "Not found!");
    }

    return res.status(200).json(updatedTransaction);

};

module.exports = updateTransactionController;
