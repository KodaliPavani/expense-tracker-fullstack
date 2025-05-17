const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  deadline: { type: Date, required: true },
  description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Goal", goalSchema);
