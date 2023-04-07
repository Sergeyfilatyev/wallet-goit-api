const express = require("express");
const controllerWrapper = require("../../helpers/controllerWrapper");
const {
  getAllTransactionsController,
  addTransactionController,
  updateTransactionController,
  deleteTransactionController,
  getTransactionController,
} = require("../../controllers");

const transactionRouter = express.Router();

transactionRouter.get("/", controllerWrapper(getAllTransactionsController));
transactionRouter.post("/", controllerWrapper(addTransactionController));
transactionRouter.patch(
  "/:transactionId",
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
