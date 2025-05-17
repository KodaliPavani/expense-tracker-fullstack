// controllers/budgetController.js
const BudgetAlert = require("../models/BudgetAlert");

exports.setBudgetAlert = async (req, res) => {
  const { userId, monthlyBudget, alertThreshold } = req.body;

  try {
    let existing = await BudgetAlert.findOne({ userId });
    if (existing) {
      existing.monthlyBudget = monthlyBudget;
      existing.alertThreshold = alertThreshold;
      await existing.save();
      return res.status(200).json({ message: "Budget alert updated." });
    }

    const newAlert = new BudgetAlert({ userId, monthlyBudget, alertThreshold });
    await newAlert.save();
    res.status(201).json({ message: "Budget alert saved." });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
};

exports.getBudgetAlert = async (req, res) => {
  const { userId } = req.params;

  try {
    const alert = await BudgetAlert.findOne({ userId });
    res.status(200).json(alert);
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
};

exports.deleteBudgetAlert = async (req, res) => {
  const { userId } = req.params;

  try {
    await BudgetAlert.findOneAndDelete({ userId });
    res.status(200).json({ message: "Budget alert deleted." });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
};
