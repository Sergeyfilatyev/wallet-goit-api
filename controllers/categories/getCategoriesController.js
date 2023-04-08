const { RequestError } = require("../../helpers");
const fs = require("fs/promises");
const path = require("path");
const categoriesPath = path.resolve("./data/categories.json");

const getCategoriesController = async (req, res) => {
  const data = await fs.readFile(categoriesPath, "utf8");
  if (!data) {
    throw RequestError(404, `Categories not found`);
  }
  res.status(200).json({ message: "Success", data: JSON.parse(data) });
};

module.exports = getCategoriesController;
