const express = require("express");
const controllerWrapper = require("../../helpers/controllerWrapper");
const {
  addTransactionController,
  updateTransactionController,
  deleteTransactionController,
  getTransactionController,
  getCategoryTransactionController,
} = require("../../controllers");

const { auth } = require("../../middlewares");

const transactionRouter = express.Router();

transactionRouter.post("/", auth, controllerWrapper(addTransactionController));
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
transactionRouter.get(
  "/category/:transactionId",
  controllerWrapper(getCategoryTransactionController)
);

module.exports = transactionRouter;
