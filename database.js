require("dotenv").config();
const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;
mongoose.set("strictQuery", false);
const connectToDatabase = async () => {
  mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log("connected to mongodb");
    })
    .catch((error) => {
      console.log(error.message);
    });
};
module.exports = connectToDatabase;
