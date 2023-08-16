const express = require("express");
const {
  registerController,
  loginController,
  isAuthenticatedController,
} = require("../controllers/authentication.controller");
const router = express.Router();

router.post("/register", registerController);
router.get("/login", loginController);
router.get("/auth", isAuthenticatedController);

module.exports = router;
