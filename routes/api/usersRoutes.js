const express = require("express");
const router = express.Router();
const authentificate = require("../../middlewares/authentificate");
const {
  logoutController,
  registerController,
  loginController,
  getCurrentUser,
} = require("../../controllers/");
const controllerWrapper = require("../../helpers/controllerWrapper");

router.post("/register", controllerWrapper(registerController));
router.post("/login", controllerWrapper(loginController));
router.get("/current", authentificate, controllerWrapper(getCurrentUser));
router.get("/logout/", controllerWrapper(logoutController));


module.exports = router;
