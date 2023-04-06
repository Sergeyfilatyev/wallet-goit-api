const express = require("express");
const controllerWrapper = require("../../helpers/controllerWrapper");
const { addTransactionController, updateTransactionController, deleteTransactionController } = require("../../controllers");

const transactionRouter = express.Router();

transactionRouter.post("/", controllerWrapper(addTransactionController));
transactionRouter.patch("/:transactionId", controllerWrapper(updateTransactionController));
transactionRouter.delete("/:transactionId", controllerWrapper(deleteTransactionController))

module.exports = transactionRouter;
