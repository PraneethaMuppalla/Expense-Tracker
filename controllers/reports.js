const ReportServices = require("../services/reports");

exports.getTimelyExpenses = async (req, res, next) => {
  try {
    const type = req.query.type;
    const userId = req.user.id;
    const response = await ReportServices.getTimelyExpense(userId, type);

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: err });
  }
};
