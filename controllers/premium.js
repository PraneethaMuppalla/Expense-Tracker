const Sequelize = require("sequelize");

const Expense = require("../model/expense");
const User = require("../model/user");

exports.getLeaderBoard = async (req, res, next) => {
  try {
    const response = await Expense.findAll({
      attributes: [
        [Sequelize.fn("SUM", Sequelize.col("expenses")), "totalExpenses"],
        "userId",
      ],
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
      group: ["userId"],
      order: [[Sequelize.literal("totalExpenses"), "DESC"]],
    });
    console.log(response);
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, err: err });
  }
};
