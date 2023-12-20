const express = require("express");

const userController = require("../controllers/user");
const authUser = require("../middleware/auth");

const router = express.Router();

router.post("/sign-up", userController.postNewUser);
router.post("/login", userController.loginUser);
router.get("/isPremiumUser", authUser, userController.isPremiumUser);

module.exports = router;
