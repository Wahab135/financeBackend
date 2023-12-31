const express = require("express");
const cors = require("cors");
const router = require("./routes/routes");
const userRouter = require("./routes/userRoutes");
const connectToDatabase = require("./database");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const ip = process.env.IP_ADDRESS;
const FRONTEND = process.env.FRONTEND;
const errorMiddleware = require("./middleware/errorMiddleware");
const validateToken = require("./middleware/validateToken");

var corsOptions = {
  origin: FRONTEND,
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
//app.use(cors());
app.use(cookieParser());
app.use(express.json());

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
