const express = require("express");

const userController = require("../controllers/user");

const router = express.Router();

router.post("/sign-up", userController.postNewUser);

module.exports = router;
