const express = require("express");
const { controllerWrapper, validateBody } = require("../../helpers/");
const {
  getAllTransactionsController,
  addTransactionController,
  updateTransactionController,
  deleteTransactionController,
  getTransactionController,
  getStatisticsController,
} = require("../../controllers");

const { auth } = require("../../middlewares");
const { addTransaction, editTransaction } = require("../../schemas");

const transactionRouter = express.Router();

transactionRouter.get(
  "/",
  auth,
  controllerWrapper(getAllTransactionsController)
);

transactionRouter.post(
  "/",
  auth,
  validateBody(addTransaction),
  controllerWrapper(addTransactionController)
);

transactionRouter.patch(
  "/:transactionId",
  auth,
  validateBody(editTransaction),
  controllerWrapper(updateTransactionController)
);
transactionRouter.delete(
  "/:transactionId",
  auth,
  controllerWrapper(deleteTransactionController)
);
transactionRouter.get(
  "/:transactionId",
  auth,
  controllerWrapper(getTransactionController)
);

module.exports = transactionRouter;
