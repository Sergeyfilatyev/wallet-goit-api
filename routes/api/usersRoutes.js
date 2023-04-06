const express = require("express");
const router = express.Router();

router.post("/register", registerController);

module.exports = router;
