const Expense = require("../model/expense");

exports.getAllExpenses = async (req, res, next) => {
  try {
    const response = await req.user.getExpenses();
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: err });
  }
};

exports.addNewExpense = async (req, res, next) => {
  try {
    const { date, expenses, category, description } = req.body;
    const response = await req.user.createExpense({
      date: date,
      expenses,
      category,
      description,
    });
    res.status(201).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: err });
  }
};
exports.deleteExpense = async (req, res, next) => {
  try {
    const expenseid = +req.params.expenseId;
    const response = await Expense.destroy({
      where: {
        id: expenseid,
        userId: req.user.id,
      },
    });
    if (response > 0) {
      res.json({ success: true, msg: "Expense deleted successfully" });
    } else {
      res.status(404).json({ success: false, msg: "Expense not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, msg: err });
  }
};
