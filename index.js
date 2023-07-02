const express = require("express");
const router = require("./routes/routes");
const connectToDatabase = require("./database");
const Product = require("./models/productModels");

const app = express();
const port = 3000;
app.use(express.json());
app.use("/api", router);
app.get("/", (req, res) => {
  res.send("Helloworld");
});

app.post("/product", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
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
