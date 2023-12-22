const Expense = require("../model/expense");
const sequelize = require("../util/database");

exports.getAllExpenses = async (req, res, next) => {
  try {
    const response = await req.user.getExpenses({
      attributes: ["id", "category", "description", "expenses", "date"],
    });
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: err });
  }
};

exports.addNewExpense = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { expenses, category, description } = req.body;
    const { totalExpenses } = req.user;
    const promise1 = await req.user.createExpense(
      {
        expenses,
        category,
        description,
      },
      { transaction: t }
    );
    const promise2 = await req.user.update(
      {
        totalExpenses: totalExpenses + +expenses,
      },
      { transaction: t }
    );

    // //independent promises ==>>> optimisation
    // const response = await Promise.all([promise1, promise2]);
    // If the execution reaches this line, no errors were thrown.
    // We commit the transaction.
    await t.commit();
    res.status(201).json(promise1);
  } catch (err) {
    // If the execution reaches this line, an error was thrown.
    // We rollback the transaction.
    await t.rollback();
    console.error(err);
    res.status(500).json({ success: false, msg: err });
  }
};
exports.deleteExpense = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const expenseid = +req.params.expenseId;
    const { totalExpenses } = req.user;
    const expesneRows = await req.user.getExpenses({
      where: { id: expenseid },
    });
    const expense = expesneRows[0];

    const response2 = await req.user.update(
      {
        totalExpenses: totalExpenses - expense.expenses,
      },
      { transaction: t }
    );
    const response = await Expense.destroy(
      {
        where: {
          id: expenseid,
          userId: req.user.id,
        },
      },
      { transaction: t }
    );

    await t.commit();
    if (response > 0) {
      res.json({ success: true, msg: "Expense deleted successfully" });
    } else {
      res.status(404).json({ success: false, msg: "Expense not found" });
    }
  } catch (err) {
    await t.rollback();
    console.error(err);
    res.status(500).json({ success: false, msg: err });
  }
};
