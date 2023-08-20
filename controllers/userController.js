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
  //console.log(JSON.parse(req.body.body));

  const { userName, password, email, salary } = req.body;
  if (!userName || !password || !email || !salary) {
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
      salary,
    });
    res.status(200).json({ message: "successfully registered!" });
  } catch (error) {
    res.status(404);
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
          id: user.id,
          salary: user.salary,
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
      sameSite: "None",
      secure: true,
    });
    res.status(200).json({ Message: "Login successfull!" });
  } else {
    console.log("Invalid email or password");
    res.status(404).json({ message: "Invalid email or password" });
  }
});

module.exports = {
  userHelloWorld,
  createUser,
  deleteUser,
  loginUser,
};
