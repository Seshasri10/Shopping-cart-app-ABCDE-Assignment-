const router = require("express").Router();
const Cart = require("../models/Cart");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  let cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) {
    cart = new Cart({ userId: req.user._id, items: [] });
  }

  cart.items.push(req.body.itemId);
  await cart.save();

  res.send(cart);
});

router.get("/", auth, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id });
  res.send(cart);
});

module.exports = router;
