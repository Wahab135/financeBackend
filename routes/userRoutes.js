const express = require("express");
const User = require("../models/userModel");
const userController = require("../controllers/userController.js");
const validateToken = require("../middleware/validateCookie");
const router = express.Router();

router.get("/", userController.userHelloWorld);

router.get("/show", userController.getUsers);

router.post("/register", userController.createUser);

router.post("/login", userController.loginUser);

router.delete("/delete", userController.deleteUser);

router.get("/users", userController.getUsers);

router.get("/current", validateToken, userController.currentUser);
router.post("/validate", userController.validateUser);

router.get("/logout", (req, res) => {
  // Clear the HttpOnly cookie by setting an empty cookie with the same name
  res.clearCookie("access-token", {
    //httpOnly: true,
    //sameSite: "strict",
    //secure: false,
  });

  res.status(200).json({ message: "Logged out successfully" });
});
module.exports = router;
