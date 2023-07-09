const express = require("express");
const cors = require("cors");
const router = require("./routes/routes");
const connectToDatabase = require("./database");
const Product = require("./models/productModels");
const mongoose = require("mongoose");
const app = express();
const port = 3005;
app.use(express.json());
app.use(cors());
app.use("/api", router);
app.get("/", (req, res) => {
  res.send("Helloworld");
  console.log("hello console");
});
//CURD CREATE
app.post("/product", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//CURD READ
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//CURD UPDATE
app.put("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res
        .status(404)
        .json({ message: `cannot find any product with ID ${id}` });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//CURD Delete
app.delete("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
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
