const Expense = require("../model/expense");

exports.getAllExpenses = async (req, res, next) => {
  try {
    const response = await Expense.findAll();
    res.json(response);
  } catch (err) {
    res.json({ success: false, msg: err });
  }
};

exports.addNewExpense = async (req, res, next) => {
  try {
    const { date, expenses, category, description } = req.body;
    const response = await Expense.create({
      date: date,
      expenses,
      category,
      description,
    });
    res.status(201).json(response);
  } catch (err) {
    res.json({ success: false, msg: err });
  }
};
exports.deleteExpense = async (req, res, next) => {
  try {
    const expenseid = +req.params.expenseId;
    const response = await Expense.destroy({
      where: {
        id: expenseid,
      },
    });
    res.json({ success: true, msg: response });
  } catch (err) {
    res.json({ success: false, msg: err });
  }
};
