const {
  logoutController,
  registerController,
  loginController,
  getCurrentUserController,
} = require("./users");

const {
  addTransactionController,
  updateTransactionController,
  deleteTransactionController,
  getTransactionController,
  getAllTransactionsController,
} = require("./transactions");

const { getCategoriesController } = require("./categories");
const { getStatisticsController } = require("./statistics");

module.exports = {
  logoutController,
  registerController,
  addTransactionController,
  updateTransactionController,
  deleteTransactionController,
  loginController,
  getCurrentUserController,
  getTransactionController,
  getAllTransactionsController,
  getCategoriesController,
  getStatisticsController,
};
