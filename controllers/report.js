const ReportServices = require("../services/reports");
const Expenses = require("../model/expense");

exports.getTimelyExpenses = async (req, res, next) => {
  try {
    const type = req.query.type;
    const userId = req.user.id;
    const response = await Expenses.find({ userId });

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: err });
  }
};

// exports.downloadExpense = async (req, res, next) => {
//   try {
//     const response = await Expenses.find({ userId: req.user });
//     const stringifiedResponse = JSON.stringify(response);
//     const userId = req.user.id;
//     const fileName = `ExpenseReport${userId}/${new Date()}.txt`;
//     const fileLocation = await ReportServices.uploadToS3(
//       stringifiedResponse,
//       fileName
//     );
//     const downloadedFile = new FilesDownloaded({
//       fileUrl: fileLocation,
//       userId,
//     });
//     downloadedFile.save();
//     res.json({ success: true, fileUrl: fileLocation });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, msg: err });
//   }
// };
