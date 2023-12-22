const ReportServices = require("../services/reports");
const FilesDownloaded = require("../model/downloadedFiles");

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

exports.downloadExpense = async (req, res, next) => {
  try {
    const response = await req.user.getExpenses();
    const stringifiedResponse = JSON.stringify(response);
    const userId = req.user.id;
    const fileName = `ExpenseReport${userId}/${new Date()}.txt`;
    const fileLocation = await ReportServices.uploadToS3(
      stringifiedResponse,
      fileName
    );
    await FilesDownloaded.create(
      { fileUrl: fileLocation },
      { where: { userId } }
    );
    res.json({ success: true, fileUrl: fileLocation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: err });
  }
};
