const express = require("express");
const { addTransactionController, updateTransactionController } = require("../../controllers/transactions");

const transactionRouter = express.Router();

transactionRouter.post("/", addTransactionController);
transactionRouter.patch("/:transactionId", updateTransactionController);

module.exports = transactionRouter;
