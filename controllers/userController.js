const express = require("express");
const userModel = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userHelloWorld = asyncHandler(async (req, res) => {
  res.send("Hello World!, user route is working!");
});

const createUser = asyncHandler(async (req, res) => {
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
  const { email, password } = req.body;
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
      { expiresIn: "1m" }
    );
    res.status(200).json({ accessToken });
  } else {
    console.log("Invalid email or password");
    res.status(401).json({ message: "Invalid email or password" });
  }
});

const getUsers = asyncHandler(async (req, res) => {
  res.send("display all users!");
});

module.exports = {
  userHelloWorld,
  createUser,
  deleteUser,
  getUsers,
  loginUser,
};
