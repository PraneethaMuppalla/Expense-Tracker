const express = require("express");

const expensesController = require("../controllers/expenses");

const router = express.Router();

router.get("/get-all-expenses", expensesController.getAllExpenses);
router.post("/add-expense", expensesController.addNewExpense);
router.delete("/delete-expense/:expenseId", expensesController.deleteExpense);

module.exports = router;
