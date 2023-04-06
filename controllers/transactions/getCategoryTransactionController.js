const { Transaction } = require("../../models");
const { RequestError } = require("../../helpers");

const getCategoryTransactionController = async (req, res) => {
    const { transactionId } = req.params;
    const data = await Transaction.findOne({ _id: transactionId });
    if (!data) {
      throw RequestError(404, `id:${transactionId} not found`);
    }
    const {category}=data
 
    res.status(200).json({ status: "success", code: 200, category });
};

module.exports = getCategoryTransactionController;