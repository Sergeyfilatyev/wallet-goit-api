const express = require("express");
const router = express.Router();
const {
  logoutController,
  registerController,
  loginController,
  getCurrentUser,
} = require("../../controllers/");
const controllerWrapper = require("../../helpers/controllerWrapper");
const { auth } = require("../../middlewares");

router.post("/register", controllerWrapper(registerController));
router.post("/login", controllerWrapper(loginController));
router.get("/current", auth, controllerWrapper(getCurrentUser));
router.get("/logout/", controllerWrapper(logoutController));

module.exports = router;
