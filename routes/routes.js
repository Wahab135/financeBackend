const express = require("express");
const Product = require("../models/productModels.js");
const router = express.Router();
const productController = require("../controllers/productController.js");

router.get("/", productController.helloWorld);
router.get("/about", productController.about);
//CURD CREATE
router.post("/product", productController.createProduct);

//CURD READ
router.get("/products", productController.getProducts);

//CURD UPDATE
router.put("/product/:id", productController.updateProduct);

//CURD Delete
router.delete("/product/:id", productController.deleteProduct);

//CURD single product reading
router.post("/getProduct/:id", productController.getProduct);
module.exports = router;
