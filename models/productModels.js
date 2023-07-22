const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
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

const product = mongoose.model("product", productSchema);
module.exports = product;
