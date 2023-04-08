const express = require("express");
const router = express.Router();
const {
  logoutController,
  registerController,
  loginController,
  getCurrentUserController,
} = require("../../controllers/");
const controllerWrapper = require("../../helpers/controllerWrapper");
const { validateBody } = require("../../helpers");
const {
  registerUserSchema,
  loginUserSchema,
  resendVerifEmail,
} = require("../../schemas");
const { auth } = require("../../middlewares");

router.post(
  "/register",
  validateBody(registerUserSchema),
  controllerWrapper(registerController)
);
router.post(
  "/login",
  validateBody(loginUserSchema),
  controllerWrapper(loginController)
);

router.get("/current", auth, controllerWrapper(getCurrentUserController));

router.get("/logout", auth, controllerWrapper(logoutController));

module.exports = router;
