const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "please add username and password!"],
    },
    password: {
      type: String,
      required: [true, "please add username and password!"],
    },
    email: {
      type: String,
      required: [true, "please enter Email"],
      unique: [true, "User already registered"],
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
