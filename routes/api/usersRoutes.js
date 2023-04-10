const express = require("express");
const router = express.Router();
const {
  logoutController,
  registerController,
  loginController,
  getCurrentUserController,
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
router.post(
  "/login",
  validateBody(loginUserSchema),
  controllerWrapper(loginController)
);

router.get("/current", auth, controllerWrapper(getCurrentUserController));

router.post("/logout", auth, controllerWrapper(logoutController));

router.get("/refresh", auth, controllerWrapper(refreshController));

module.exports = router;
