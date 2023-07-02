const express = require("express");
const router = require("./routes/routes");
const connectToDatabase = require("./database");

const app = express();
const port = 3000;
app.use("/api", router);
app.get("/", (req, res) => {
  res.send("Helloworld");
});

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`listening on port : ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
