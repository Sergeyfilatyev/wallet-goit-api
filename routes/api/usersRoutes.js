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
router.get("/logout/:id", controllerWrapper(logoutController));

module.exports = router;
