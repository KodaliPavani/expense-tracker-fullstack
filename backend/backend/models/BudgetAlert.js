// models/BudgetAlert.js
const mongoose = require("mongoose");

const budgetAlertSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  monthlyBudget: { type: Number, required: true },
  alertThreshold: { type: Number, required: true }
});

module.exports = mongoose.model("BudgetAlert", budgetAlertSchema);
