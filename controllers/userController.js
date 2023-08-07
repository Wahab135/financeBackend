const express = require("express");
const userModel = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userHelloWorld = asyncHandler(async (req, res) => {
  res.send("Hello World!, user route is working!");
});

const validateUser = asyncHandler(async (req, res) => {
  console.log("Entering validate cookie token!");
  const token = req.cookies["access-token"];
  console.log("here");

  if (!token) {
    res.status(401); // Use 401 Unauthorized for missing token
    throw new Error("Token is missing!");
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("token is present!");
    req.user = decoded;
    console.log(req.user.user.id);
    res.status(200).json({ message: "Token is valid!" }); // Respond with success message
  } catch (err) {
    console.error("JWT verification error:", err);
    res.status(401).json({ error: "Token is invalid!" }); // Respond with error message
  }

  console.log("exiting validate token");
});

const createUser = asyncHandler(async (req, res) => {
  //console.log(JSON.parse(req.body.body));

  const { userName, password, email } = req.body;
  if (!userName || !password || !email) {
    res.status(500);
    throw new Error("All fields are required!");
  }
  const userAvailable = await userModel.findOne({ email });
  if (userAvailable) {
    res.status(500);
    throw new Error("User already registered!");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await userModel.create({
      userName,
      email,
      password: hashedPassword,
    });
    res.status(200).json({
      _id: user.id,
      email: user.email,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  res.send("Deleted user!");
});

const loginUser = asyncHandler(async (req, res) => {
  console.log("-----------------------------------------------------------");

  //const { email, password } = JSON.parse(req.body.body);
  const { email, password } = req.body;
  //const { email, password } = req.body.body;

  if (!email || !password) {
    res.status(500);
    throw new Error("All fields are mandatory!");
  }
  const user = await userModel.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          userName: user.userName,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    /*res.cookie("access_token", accessToken, {
      expires: new Date(Date.now() + 3600000),
      secure: false, // Use 'true' if using HTTPS
      httpOnly: true, // Cookie can only be accessed via HTTP(S)
    });*/
    res.cookie("access-token", accessToken, {
      httpOnly: true,
      secure: false,
    });
    res.status(200).json({ accessToken });
  } else {
    console.log("Invalid email or password");
    res.status(401).json({ message: "Invalid email or password" });
  }
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await userModel.find({});
  if (users) {
    res.status(200).send(users);
  } else {
    res.status(500).send({ message: "cant query users!" });
  }
});

const currentUser = asyncHandler(async (req, res) => {
  res.status(200).send(req.user);
});
module.exports = {
  userHelloWorld,
  createUser,
  deleteUser,
  getUsers,
  loginUser,
  currentUser,
  validateUser,
};
