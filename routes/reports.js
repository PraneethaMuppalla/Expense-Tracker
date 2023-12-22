const express = require("express");

const ReportsController = require("../controllers/reports");
const authUser = require("../middleware/auth");

const router = express.Router();

router.get("/reports", authUser, ReportsController.getTimelyExpenses);

module.exports = router;
