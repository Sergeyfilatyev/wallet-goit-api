const express = require("express");
const { controllerWrapper } = require("../../helpers");
const { googleAuth, googleRedirect } = require("../../controllers");

const googleAuthRouter = express.Router();

googleAuthRouter.get("/google", controllerWrapper(googleAuth));
googleAuthRouter.get("/google-redirect", controllerWrapper(googleRedirect));

module.exports = googleAuthRouter;
