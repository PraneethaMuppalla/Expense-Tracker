const express = require("express");

const expensesController = require("../controllers/expense");
const authUser = require("../middleware/auth");
const router = express.Router();

router.get("/get-expenses", authUser, expensesController.getExpenses);
router.post("/add-expense", authUser, expensesController.addNewExpense);
router.delete(
  "/delete-expense/:expenseId",
  authUser,
  expensesController.deleteExpense
);

module.exports = router;
