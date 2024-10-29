const express = require("express");
const ProductManager = require("../managers/ProductManager");

const router = express.Router();
const productManager = new ProductManager("./src/data/products.json");

router.get("/", (req, res) => {
  const products = productManager.getAllProducts();
  res.render("index", { products });
});

router.get("/realtimeproducts", (req, res) => {
  const products = productManager.getAllProducts();
  res.render("realTimeProducts", { products });
});

module.exports = router;
