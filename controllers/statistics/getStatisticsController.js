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
      return currentYear === date.year && currentMonth === date.month - 1;
    } else {
      return year === date.year && month === date.month;
    }
  });

  const categories = [
    "main",
    "products",
    "car",
    "self care",
    "children",
    "house",
    "education",
    "leisure",
    "other",
  ];

  const initialCategoryTotals = {};
  categories.forEach((category) => {
    initialCategoryTotals[category] = 0;
  });

  const { income, expense, expenseCategoryTotals } = filterData.reduce(
    (acc, { amount, income, category }) => {
      if (income) {
        acc.income += amount;
      } else {
        acc.expense += amount;
        acc.expenseCategoryTotals[category] += amount;
      }
      return acc;
    },
    {
      income: 0,
      expense: 0,
      expenseCategoryTotals: { ...initialCategoryTotals },
    }
  );

  const statistics = {
    totalIncome: income,
    totalExpense: expense,
    expenseByCategory: expenseCategoryTotals,
  };

  res.json({ message: "Successful operation", data: statistics });
};
module.exports = getStatisticsController;
