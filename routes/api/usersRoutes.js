const express = require("express");
const router = express.Router();
const {
  logoutController,
  registerController,
  loginController,
} = require("../../controllers/");
const controllerWrapper = require("../../helpers/controllerWrapper");

router.post("/register", controllerWrapper(registerController));
router.post("/login", controllerWrapper(loginController));
router.post("/logout", controllerWrapper(logoutController));

module.exports = router;
