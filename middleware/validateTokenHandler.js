const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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

module.exports = validateToken;
