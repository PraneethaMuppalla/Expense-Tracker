const express = require("express");

const ReportsController = require("../controllers/report");
const authUser = require("../middleware/auth");

const router = express.Router();

router.get("/reports", authUser, ReportsController.getTimelyExpenses);
//outer.get("/reportFromS3", authUser, ReportsController.downloadExpense);
module.exports = router;
