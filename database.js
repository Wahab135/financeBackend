require("dotenv").config();
const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;
mongoose.set("strictQuery", false);

const connectToDatabase = async () => {
  try {
    const connection = await mongoose.connect(MONGO_URL);
    console.log(connection.connection.host, connection.connection.name);
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = connectToDatabase;
