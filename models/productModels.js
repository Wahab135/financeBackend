const mongoose = require("mongoose");

const appSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
    },
    price: {
      type: Number,
      required: [true, "Please enter price"],
    },
  },
  {
    timestamps: true,
  }
);

const product = mongoose.model("product", appSchema);
module.exports = product;
