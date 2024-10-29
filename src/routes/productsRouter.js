const express = require("express");
const ProductManager = require("../managers/ProductManager");
const io = require("../app");

const router = express.Router();
const productManager = new ProductManager("./src/data/products.json");

router.get("/", (req, res) => {
  const products = productManager.getAllProducts();
  res.json(products);
});

router.post("/", (req, res) => {
  const newProduct = productManager.addProduct(req.body);
  const products = productManager.getAllProducts();
  io.emit("updateProductList", products);
  res.status(201).json(newProduct);
});

router.delete("/:pid", (req, res) => {
  const productId = parseInt(req.params.pid);
  const deletedProduct = productManager.deleteProduct(productId);
  const products = productManager.getAllProducts();
  io.emit("updateProductList", products);
  if (deletedProduct) {
    res.json(deletedProduct);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

module.exports = router;
