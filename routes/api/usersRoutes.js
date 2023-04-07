const express = require("express");
const router = express.Router();
const {
  logoutController,
  registerController,
  loginController,
} = require("../../controllers/");
const controllerWrapper = require("../../helpers/controllerWrapper");
const { auth } = require("../../middlewares");

router.post("/register", controllerWrapper(registerController));
router.post("/login", controllerWrapper(loginController));
router.get("/logout", auth, controllerWrapper(logoutController));

module.exports = router;
