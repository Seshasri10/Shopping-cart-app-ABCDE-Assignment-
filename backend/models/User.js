const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  token: { type: String, default: null }
});

module.exports = mongoose.model("User", userSchema);
