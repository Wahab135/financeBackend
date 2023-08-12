const express = require("express");
const Product = require("../models/productModels.js");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const helloWorld = (req, res) => {
  res.send("Hello-World");
};

const about = (req, res) => {
  throw new Error("Fake Error");
  res.send("Hello this is Wahab");
};

const getProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({ user_id: req.user.user.id });
    const salary = req.user.user.salary;
    const totalSum = products.reduce((sum, product) => sum + product.price, 0);

    console.log("Total Sum of Product Prices:", totalSum);
    console.log("Total Sum of salary:", salary);
    res.status(200).json({ products, totalSum, salary });
  } catch (error) {
    res.status(404);
    throw new Error(error.message);
  }
});

const getProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.user.id;
    const product = await Product.findOneAndUpdate(
      { _id: id, user_id: userId },
      req.body
    );
    if (!product) {
      return res
        .status(404)
        .json({ message: `cannot find any product with ID ${id}` });
    }
    const updatedProduct = await Product.find({ _id: id, user_id: userId });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(401);
    throw new Error(error.message);
  }
});

const updateProductCookie = asyncHandler(async (req, res) => {
  const token = req.cookies["access-token"];
  if (!token) {
    res.status(401);
    throw new Error("token is missing!");
  }
  try {
    const decoded = jwt.verify(token, proce.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    const userId = decoded.user.id;
    const { id } = req.params;
    const product = await Product.findOneAndUpdate(
      { _id: id, user_id: userId },
      req.body
    );
    res.status(200).json(product);

    if (!product) {
      return res
        .status(404)
        .json({ message: `cannot find any product with ID ${id}` });
    }
    const updatedProduct = await Product.find({ _id: id, user_id: userId });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const createProduct = asyncHandler(async (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    res.status(500);
    throw new Error("All fields are required!");
  }
  try {
    const product = await Product.create({
      name,
      price,
      user_id: req.user.user.id,
    });
    res.status(200).send("Product created successfully!");
  } catch (error) {
    res.status(404);
    throw new Error(error.message);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.user.id;
    const product = await Product.findOneAndDelete({
      _id: id,
      user_id: userId,
    });
    res.status(200).json({ message: "Product deleted successfully!" });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

module.exports = {
  helloWorld,
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProduct,
  about,
};
