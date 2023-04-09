const express = require("express");
const { controllerWrapper } = require("../../helpers/");
const { getStatisticsController } = require("../../controllers");

const { auth } = require("../../middlewares");

const statisticsRouter = express.Router();

statisticsRouter.get("/", auth, controllerWrapper(getStatisticsController));

module.exports = statisticsRouter;
