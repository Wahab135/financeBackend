const express = require("express");

const router = express.Router();
router.get("/", (req, res) => {
  res.send("In routes folder in /");
});

router.get("/g", (req, res) => {
  res.send("In routes folder in /g");
});

module.exports = router;
