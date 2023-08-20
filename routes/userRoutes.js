const express = require("express");
const User = require("../models/userModel");
const userController = require("../controllers/userController.js");
const validateToken = require("../middleware/validateCookie");
const router = express.Router();

router.get("/", userController.userHelloWorld);

router.post("/register", userController.createUser);

router.post("/login", userController.loginUser);

router.delete("/delete", userController.deleteUser);

router.get("/logout", (req, res) => {
  // Clear the HttpOnly cookie by setting an empty cookie with the same name
  res.clearCookie("access-token", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });

  res.status(200).json({ message: "Logged out successfully" });
});
module.exports = router;
