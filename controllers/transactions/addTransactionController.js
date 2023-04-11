const { Transaction, User } = require("../../models");
const { RequestError } = require("../../helpers");

const addTransactionController = async (req, res) => {
  const { _id: owner } = req.user;
  const { amount, income } = req.body;
  const newTransaction = await Transaction.create({ ...req.body, owner });

  if (!newTransaction) {
    throw RequestError(400, "Transaction creation faild");
  }

  const calculatedNumber = income === true ? amount : amount * -1;

  const user = await User.findOne(owner);
  user.balance = user.balance + calculatedNumber;
  user.save();

  return res.status(201).json({
    message: "Transaction successfully created",
    data: {
      category: newTransaction.category,
      amount: newTransaction.amount,
      comment: newTransaction.comment,
      income: newTransaction.income,
      balance: user.balance,
    },
  });
};

module.exports = addTransactionController;
