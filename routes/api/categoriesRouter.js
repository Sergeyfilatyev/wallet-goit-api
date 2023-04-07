const express = require("express");
const controllerWrapper = require("../../helpers/controllerWrapper");
const { getCategoriesController } = require("../../controllers");

const { auth } = require("../../middlewares");

const categoriesRouter = express.Router();

categoriesRouter.get("/", controllerWrapper(getCategoriesController));

module.exports = categoriesRouter;
