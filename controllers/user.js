const User = require("../model/user");
const bcrypt = require("bcrypt");

exports.postNewUser = async (req, res, next) => {
  const { email, name, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (user) {
      res.status(409).json({ error: "User already exists." });
    } else {
      bcrypt.hash(password, 10, async (err, hashedPassword) => {
        const response = await User.create({ name, email, hashedPassword });
        res.status(201).json({ msg: "User registration successful." });
      });
    }
  } catch (err) {
    console.error(err);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else if (user.password === req.body.password) {
      console.log("object");
      res.status(201).json({ msg: "Successful Login" });
    } else {
      res.status(401).json({ error: "Password doesn't match" });
    }
  } catch (err) {
    console.error(err);
  }
};
