const Expense = require("../model/expense");
const User = require("../model/user");
const mongoose = require("mongoose");

exports.getExpenses = async (req, res, next) => {
  try {
    const page = +req.query.page || 0;
    const rows = +req.query.rows || 5;
    const offSetNow = page * rows;
    const totalCount = await Expense.countDocuments({ userId: req.user.id });
    const response = await Expense.find({ userId: req.user._id })
      .skip(offSetNow)
      .limit(rows);
    res.status(200).json({
      expenses: response,
      currentPage: page,
      hasNextPage: offSetNow + rows < totalCount,
      nextPage: page + 1,
      hasPreviousPage: page > 0,
      previousPage: page - 1,
      lastPage: Math.ceil(totalCount / rows),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: err });
  }
};

exports.addNewExpense = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { expenses, category, description } = req.body;
    const newExpense = new Expense({
      expenses,
      category,
      description,
      userId: req.user,
    });
    const result = await newExpense.save({ session });
    const user = await User.findById(req.user.id);
    user.totalExpenses += Number(expenses);
    await user.save({ session });
    await session.commitTransaction();

    res.status(201).json(result);
  } catch (err) {
    // If the execution reaches this line, an error was thrown.
    // We rollback the transaction.
    await session.abortTransaction();
    console.error(err);
    res.status(500).json({ success: false, msg: err });
  }
};
exports.deleteExpense = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    console.log("object");
    const expenseid = req.params.expenseId;
    const expense = await Expense.findById({ _id: expenseid });
    const user = await User.findById(req.user.id);
    user.totalExpenses -= Number(expense.expenses);
    await user.save({ session });
    const response = await Expense.findByIdAndDelete(expenseid).session(
      session
    );
    await session.commitTransaction();
    if (response) {
      res.status(204).json({ success: true });
    } else {
      res.status(404).json({ success: false, msg: "Expense not found" });
    }
  } catch (err) {
    await session.abortTransaction();
    console.error(err);
    console.log("hit");
    res.status(500).json({ success: false, msg: JSON.stringify(err) });
  }
};
