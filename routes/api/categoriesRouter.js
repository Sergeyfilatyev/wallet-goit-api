const express = require("express");
const controllerWrapper = require("../../helpers/controllerWrapper");
const { getCategoriesController } = require("../../controllers");

const categoriesRouter = express.Router();

categoriesRouter.get("/", controllerWrapper(getCategoriesController));

module.exports = categoriesRouter;
