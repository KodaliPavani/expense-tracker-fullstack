// routes/budgetRoutes.js
const express = require("express");
const router = express.Router();
const { setBudgetAlert, getBudgetAlert, deleteBudgetAlert } = require("../controllers/budgetController");

router.post("/", setBudgetAlert);
router.get("/:userId", getBudgetAlert);
router.delete("/:userId", deleteBudgetAlert);

module.exports = router;
