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

  if (req.body.amount || "income" in req.body) {
    const user = await User.findOne(owner);

    if (req.body.amount && !("income" in req.body)) {
      const calculatedNumber =
        transactionToUpdate.income === true
          ? updatedTransaction.amount - transactionToUpdate.amount
          : transactionToUpdate.amount - updatedTransaction.amount;

      user.balance = user.balance + calculatedNumber;
      user.save();
    }

    if ("income" in req.body && !req.body.amount) {
      calculatedNumber =
        transactionToUpdate.income === true &&
        updatedTransaction.income === false
          ? transactionToUpdate.amount * -2
          : transactionToUpdate.income === false &&
            updatedTransaction.income === true
          ? transactionToUpdate.amount * 2
          : 0;

      user.balance = user.balance + calculatedNumber;
      user.save();
    }

    if ("income" in req.body && req.body.amount) {
      const calculatedNumber =
        transactionToUpdate.income === true &&
        updatedTransaction.income === false
          ? (updatedTransaction.amount + transactionToUpdate.amount) * -1
          : transactionToUpdate.income === false &&
            updatedTransaction.income === true
          ? transactionToUpdate.amount + updatedTransaction.amount
          : 0;

      user.balance = user.balance + calculatedNumber;
      user.save();
    }
  }

  return res.status(200).json({
    message: "Success update",
    data: {
      _id: updatedTransaction.id,
      amount: updatedTransaction.amount,
      income: updatedTransaction.income,
      category: updatedTransaction.category,
      comment: updatedTransaction.comment,
      date: updatedTransaction.date,
      owner: updatedTransaction.owner,
      createdAt: updatedTransaction.createdAt,
      updatedAt: updatedTransaction.updatedAt,
    },
  });
};

module.exports = updateTransactionController;
