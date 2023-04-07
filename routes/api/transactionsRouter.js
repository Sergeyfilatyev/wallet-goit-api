const express = require("express");
const controllerWrapper = require("../../helpers/controllerWrapper");
const {
  getAllTransactionsController,
  addTransactionController,
  updateTransactionController,
  deleteTransactionController,
  getTransactionController,
} = require("../../controllers");
const { validateBody } = require("../../helpers");
const { addTransaction, editTransaction } = require("../../schemas");

const transactionRouter = express.Router();

transactionRouter.get("/", controllerWrapper(getAllTransactionsController));

transactionRouter.post(
  "/",
  validateBody(addTransaction),
  controllerWrapper(addTransactionController)
);

transactionRouter.patch(
  "/:transactionId",
  validateBody(editTransaction),
  controllerWrapper(updateTransactionController)
);
transactionRouter.delete(
  "/:transactionId",
  controllerWrapper(deleteTransactionController)
);
transactionRouter.get(
  "/:transactionId",
  controllerWrapper(getTransactionController)
);

module.exports = transactionRouter;
