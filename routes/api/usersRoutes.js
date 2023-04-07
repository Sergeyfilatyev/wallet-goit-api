const express = require("express");
const router = express.Router();
const authentificate = require("../../middlewares/authentificate");
const {
  logoutController,
  registerController,
  loginController,
  getCurrentUserController,
} = require("../../controllers/");
const controllerWrapper = require("../../helpers/controllerWrapper");

router.post("/register", controllerWrapper(registerController));
router.post("/login", controllerWrapper(loginController));
router.post("/logout", controllerWrapper(logoutController));
router.get(
  "/current",
  authentificate,
  controllerWrapper(getCurrentUserController)
);

module.exports = router;
