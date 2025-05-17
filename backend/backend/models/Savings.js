const mongoose = require("mongoose");

const savingsSchema = new mongoose.Schema({
  goal: { type: Number, required: true },
  saved: { type: Number, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Savings", savingsSchema);
