const express = require("express");

const purchaseControllers = require("../controllers/purchase");

const authUser = require("../middleware/auth");

const router = express.Router();

router.get("/premiumMembership", authUser, purchaseControllers.purchasePremium);

router.post(
  "/updateTransactionStatus",
  authUser,
  purchaseControllers.updateTransactionStatus
);

module.exports = router;
