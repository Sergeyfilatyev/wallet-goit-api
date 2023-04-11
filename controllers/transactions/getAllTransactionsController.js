const { Transaction, User } = require("../../models");
const { RequestError } = require("../../helpers");

const getAllTransactionsController = async (req, res) => {
  const { _id: owner } = req.user;
  const allTransactions = await Transaction.find({ owner: owner });

  const user = await User.findById(owner);

  if (!allTransactions) {
    throw RequestError(404, "Not found");
  }

  return res.status(200).json({ data: allTransactions, balance:  user.balance});
};

module.exports = getAllTransactionsController;
