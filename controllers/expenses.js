const Expense = require("../model/expense");

exports.getAllExpenses = async (req, res, next) => {
  try {
    const response = await req.user.getExpenses({
      attributes: ["category", "description", "expenses", "date"],
    });
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: err });
  }
};

exports.addNewExpense = async (req, res, next) => {
  try {
    const { date, expenses, category, description } = req.body;
    const { totalExpenses } = req.user;
    const promise1 = req.user.createExpense({
      date: date,
      expenses,
      category,
      description,
    });
    const promise2 = req.user.update({
      totalExpenses: totalExpenses + +expenses,
    });
    //independent promises ==>>> optimisation
    const response = await Promise.all([promise1, promise2]);
    //console.log("response=====>>>>>>>>" + response);
    res.status(201).json(response[0]);
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
    res.status(500).json({ success: false, msg: err });
  }
};
