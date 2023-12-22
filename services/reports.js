const Expenses = require("../model/expense");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");

exports.getTimelyExpense = async (userId, type) => {
  let response;
  switch (type) {
    case "today":
      response = await Expenses.findAll({
        where: { userId, date: new Date() },
      });
      break;
    case "month":
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      response = await Expenses.findAll({
        where: {
          userId,
          date: {
            [Op.lte]: new Date(),
            [Op.gte]: startOfMonth,
          },
        },
      });
      break;
    case "year":
      const startOfYear = new Date();
      startOfYear.setMonth(1);
      response = await Expenses.findAll({
        where: {
          userId,
          date: {
            [Op.lte]: new Date(),
            [Op.gte]: startOfYear,
          },
        },
      });
      break;
    default:
      response = await Expenses.findAll({ where: { userId } });
  }
  return response;
};
