const router = require("express").Router();
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id });
  if (!cart || cart.items.length === 0) {
    return res.status(400).send("Cart empty");
  }

  const order = new Order({
    userId: req.user._id,
    items: cart.items
  });

  await order.save();
  cart.items = [];
  await cart.save();

  res.send(order);
});

router.get("/", auth, async (req, res) => {
  const orders = await Order.find({ userId: req.user._id });
  res.send(orders);
});

module.exports = router;
