//connectionString = mongodb+srv://wahab:<password>@nodeapitesting.8brpasx.mongodb.net/?retryWrites=true&w=majority
const mongoose = require("mongoose");
const connectToDatabase = async () => {
  mongoose
    .connect(
      "mongodb+srv://wahab:03315046101@nodeapitesting.8brpasx.mongodb.net/Node-API?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("connected to mongodb");
    })
    .catch((error) => {
      console.log(error.message);
    });
};
module.exports = connectToDatabase;
