const User = require("../model/user");
const bcrypt = require("bcrypt");

exports.postNewUser = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;
    const users = await User.findAll({
      where: {
        email: email,
      },
    });
    const user = users[0];
    if (user) {
      //user already exists
      res.status(409).json({ success: false, error: "User already exists." });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({ name, email, password: hashedPassword });
      res
        .status(201)
        .json({ success: true, msg: "User registration successful." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: err });
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const users = await User.findAll({ where: { email: email } });
    const user = users[0];
    if (!user) {
      //not found
      res.status(404).json({ msg: "User not found" });
    } else {
      const passwordsMatch = await bcrypt.compare(password, user.password);
      if (passwordsMatch) {
        res.status(200).json({ success: true, msg: "Successful Login" });
      } else {
        //unauthorized
        res.status(401).json({ success: false, msg: "Password doesn't match" });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: err });
  }
};
