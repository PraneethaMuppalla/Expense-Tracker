const express = require("express");

const purchaseController = require("../controllers/purchase");

const authUser = require("../middleware/auth");

const router = express.Router();

router.get("/premiumMembership", authUser, purchaseController.purchasePremium);

router.post(
  "/updateTransactionStatus",
  authUser,
  purchaseController.updateTransactionStatus
);

module.exports = router;
