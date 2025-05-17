const Savings = require("../models/Savings");

exports.getAllSavings = async (req, res) => {
  try {
    const savings = await Savings.find();
    res.json(savings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createSaving = async (req, res) => {
  try {
    const newSaving = new Savings(req.body);
    const saved = await newSaving.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateSaving = async (req, res) => {
  try {
    const updated = await Savings.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteSaving = async (req, res) => {
  try {
    await Savings.findByIdAndDelete(req.params.id);
    res.json({ message: "Saving entry deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
