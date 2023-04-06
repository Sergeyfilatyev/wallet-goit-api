const express = require("express");
const router = express.Router();
const {
  logoutController,
  registerController,
} = require("../../controllers/users");
const controllerWrapper = require("../../helpers/controllerWrapper");

router.post("/register", controllerWrapper(registerController));
router.post("/logout", controllerWrapper(logoutController));

module.exports = router;
