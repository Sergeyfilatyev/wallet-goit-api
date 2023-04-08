const { Transaction, User } = require("../../models");
const { RequestError } = require("../../helpers");

const deleteTransactionController = async (req, res) => {
  const { transactionId: id } = req.params;
  const { _id: owner } = req.user;
  
  const removedTransaction = await Transaction.findOneAndDelete({ _id: id, owner});
  
  if (!removedTransaction) {
    throw RequestError(404, "Not found!");
  }

  const calculatedNumber = removedTransaction.income === false ? removedTransaction.amount : removedTransaction.amount * -1;

  const user = await User.findOne(owner);
  user.balance = user.balance + calculatedNumber;
  user.save();

  return res.status(200).json({
    message: "Transaction removed",
  });
};

module.exports = deleteTransactionController;
