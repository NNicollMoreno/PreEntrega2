const express = require("express");
const CartManager = require("../managers/CartManager");

const router = express.Router();
const cartManager = new CartManager("./src/data/carts.json");

router.post("/", (req, res) => {
  const newCart = cartManager.createCart();
  res.status(201).json(newCart);
});

router.post("/:cid/product/:pid", (req, res) => {
  const cartId = parseInt(req.params.cid);
  const productId = parseInt(req.params.pid);
  const cart = cartManager.addProductToCart(cartId, productId);
  if (cart) {
    res.json(cart);
  } else {
    res.status(404).json({ error: "Carrito o producto no encontrado" });
  }
});

module.exports = router;
