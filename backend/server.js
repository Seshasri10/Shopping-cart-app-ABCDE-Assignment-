require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("Mongo connection failed:", err.message);
    process.exit(1); // prevents silent crashes
  });


app.use("/users", userRoutes);
app.use("/items", itemRoutes);
app.use("/carts", cartRoutes);
app.use("/orders", orderRoutes);

app.get("/", (req, res) => res.send("Shopping Cart API Running"));

app.listen(process.env.PORT || 5000);
