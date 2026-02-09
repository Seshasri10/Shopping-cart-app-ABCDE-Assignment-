const express = require("express");
const router = express.Router();

const Cart = require("../models/Cart");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    const { itemId, quantity } = req.body;

    let cart = await Cart.findOne({ userId: req.userId });

    if (!cart) {
      cart = new Cart({
        userId: req.userId,
        items: [{ itemId, quantity }]
      });
      await cart.save();
      return res.status(201).json(cart);
    }

    cart.items.push({ itemId, quantity });
    await cart.save();

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;  
