const express = require("express");

const router = express.Router();

const { auth } = require("../../middlewares");

const asyncHandler = require("express-async-handler");

const logout = require("../../controllers/users");

router.post("/logout", auth, asyncHandler(logout));

module.exports = router;
