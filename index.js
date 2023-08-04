const express = require("express");
const cors = require("cors");
const router = require("./routes/routes");
const userRouter = require("./routes/userRoutes");
const connectToDatabase = require("./database");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const FRONTEND = process.env.FRONTEND;
const errorMiddleware = require("./middleware/errorMiddleware");
const validateToken = require("./middleware/validateTokenHandler");
var corsOptions = {
  origin: FRONTEND,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(express.json());
app.use(cors(corsOptions));

app.use("/user", userRouter);
app.use("/", router);
app.use(errorMiddleware);

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listening on port : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
