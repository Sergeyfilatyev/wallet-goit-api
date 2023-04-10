const {
  logoutController,
  registerController,
  loginController,
  getCurrentUserController,
  refreshController,
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
const { googleAuth, googleRedirect } = require("./google");

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
  googleAuth,
  googleRedirect,
  refreshController,
};
