const express = require("express");

const expensesController = require("../controllers/expenses");
const authUser = require("../middleware/auth");
const router = express.Router();

router.get("/get-all-expenses", authUser, expensesController.getAllExpenses);
router.post("/add-expense", authUser, expensesController.addNewExpense);
router.delete(
  "/delete-expense/:expenseId",
  authUser,
  expensesController.deleteExpense
);

module.exports = router;
