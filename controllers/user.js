const User = require("../model/user");

exports.postNewUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (user) {
      res.status(409).json({ error: "User already exists." });
    } else {
      const response = await User.create(req.body);
      res.status(201).json({ msg: "User registration successful." });
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
    }
    if (user.password === req.body.password) {
      res.status(201);
    } else {
      res.status(401).json({ error: "Password doesn't match" });
    }
  } catch (err) {
    console.error(err);
  }
};
