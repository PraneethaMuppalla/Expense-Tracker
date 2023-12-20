const express = require("express");
const router = express.Router();

const authUser = require("../middleware/auth");
const premiumController = require("../controllers/premium");

router.get("/getLeaderBoard", authUser, premiumController.getLeaderBoard);

module.exports = router;
