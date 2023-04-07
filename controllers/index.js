const {
  logoutController,
  registerController,
  loginController,
} = require("./users");

const {
  addTransactionController,
  updateTransactionController,
  deleteTransactionController,
  getTransactionController,
} = require("./transactions");

const { getCategoriesController } = require("./categories");

module.exports = {
  logoutController,
  registerController,
  addTransactionController,
  updateTransactionController,
  deleteTransactionController,
  loginController,
  getTransactionController,
  getCategoriesController,
};
