const router = require("express").Router();
const Item = require("../models/Item");

router.post("/", async (req, res) => {
  const item = new Item(req.body);
  await item.save();
  res.send(item);
});

router.get("/", async (req, res) => {
  const items = await Item.find();
  res.send(items);
});

module.exports = router;
