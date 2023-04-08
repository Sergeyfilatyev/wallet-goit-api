const { Transaction, User } = require("../../models");
const { RequestError } = require("../../helpers");

const updateTransactionController = async (req, res) => {
  const { transactionId: id } = req.params;
  const { _id: owner } = req.user;

  const transactionToUpdate = await Transaction.findOne({ _id: id, owner });

  const updatedTransaction = await Transaction.findOneAndUpdate(
    { _id: id, owner },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedTransaction) {
    throw RequestError(404, "Not found!");
  }

  if (req.body.amount) {
    const user = await User.findOne(owner);
    const calculatedNumber =
      transactionToUpdate.income === true
        ? updatedTransaction.amount - transactionToUpdate.amount
        : transactionToUpdate.amount - updatedTransaction.amount;

    user.balance = user.balance + calculatedNumber;
    user.save();
  }

  return res.status(200).json(updatedTransaction);
};

module.exports = updateTransactionController;
