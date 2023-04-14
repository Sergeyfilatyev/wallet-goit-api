const express = require("express");
const router = express.Router();
const {
  logoutController,
  registerController,
  loginController,
  getCurrentUserController,
  verifyController,
  resendEmailController,
  refreshController,
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

router.get("/verify/:verificationToken", controllerWrapper(verifyController));

router.post(
  "/verify",
  validateBody(resendVerifEmail),
  controllerWrapper(resendEmailController)
);

router.post(
  "/login",
  validateBody(loginUserSchema),
  controllerWrapper(loginController)
);

router.get("/current", auth, controllerWrapper(getCurrentUserController));

router.post("/logout", auth, controllerWrapper(logoutController));

router.get("/refresh", controllerWrapper(refreshController));

module.exports = router;
