const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
require("dotenv").config();
//for postman API or using contextAPI and sending requests with authorization header.
/*
const validateToken = asyncHandler(async (req, res, next) => {
  console.log("Entering validate token!");
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(500);
        throw new Error("User is not authorized!");
      }
      req.user = decoded;
      console.log(req.user.user.id);
    });
  } else {
    if (!token) {
      res.status(500);
      throw new Error("Token is missing!");
    }
  }
  console.log("exiting validate token");
  next();
});
*/

//with cookies.
const validateCookie = asyncHandler(async (req, res, next) => {
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
    //res.status(200).json({ message: "Token is valid!" }); // Respond with success message
  } catch (err) {
    console.error("JWT verification error:", err);
    res.status(401).json({ error: "Token is invalid!" }); // Respond with error message
    throw new Error("token is invalid!");
  }

  console.log("exiting validate token");
  next();
});
module.exports = validateCookie;
