const express = require("express");
const User = require("../models/userModel");
const userController = require("../controllers/userController.js");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.get("/", userController.userHelloWorld);

router.get("/show", userController.getUsers);

router.post("/register", userController.createUser);

router.post("/login", userController.loginUser);

router.delete("/delete", userController.deleteUser);

router.get("/users", userController.getUsers);

router.get("/current", validateToken, userController.currentUser);
module.exports = router;
