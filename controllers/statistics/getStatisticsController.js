const { Transaction } = require("../../models");
const { RequestError } = require("../../helpers");

const getStatisticsController = async (req, res) => {
  const { _id: owner } = req.user;
  const data = await Transaction.find({ owner });
  if (!data) {
    throw RequestError(400);
  }
  const year = parseInt(req.query.year);
  const month = parseInt(req.query.month);

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const filterData = data.filter(({ date }) => {
    if (!year || !month) {
      return currentYear === date.year && currentMonth === date.month;
    } else {
      return year === date.year && month - 1 === date.month;
    }
  });

  const categories = [
    "main expenses",
    "products",
    "car",
    "self care",
    "child care",
    "household products",
    "education",
    "leisure",
    "other expenses",
  ];

  const initialCategoryTotals = {};
  categories.forEach((category) => {
    initialCategoryTotals[category] = 0;
  });

  const { income, expense, incomeCategoryTotals, expenseCategoryTotals } =
    filterData.reduce(
      (acc, { amount, income, category }) => {
        if (income) {
          acc.income += amount;
          acc.incomeCategoryTotals[category] += amount;
        } else {
          acc.expense += amount;
          acc.expenseCategoryTotals[category] += amount;
        }
        return acc;
      },
      {
        income: 0,
        expense: 0,
        incomeCategoryTotals: { ...initialCategoryTotals },
        expenseCategoryTotals: { ...initialCategoryTotals },
      }
    );

  const statistics = {
    totalIncome: income,
    totalExpense: Math.abs(expense),
    expenseByCategory: expenseCategoryTotals,
    incomeByCategory: incomeCategoryTotals,
  };

  res.json({ message: "success", statistics });
};
module.exports = getStatisticsController;
