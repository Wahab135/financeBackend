const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//with cookies.
const validateCookie = asyncHandler(async (req, res, next) => {
  const token = req.cookies["access-token"];

  if (!token) {
    res.status(401); // Use 401 Unauthorized for missing token
    throw new Error("Cookie is missing!");
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    //res.status(200).json({ message: "Token is valid!" }); // Respond with success message
  } catch (err) {
    res.status(401).json({ error: "Token is invalid!" }); // Respond with error message
    throw new Error("token is invalid!");
  }

  next();
});
module.exports = validateCookie;
