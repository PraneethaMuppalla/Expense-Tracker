const jwt = require("jsonwebtoken");
const User = require("../model/user");

const authenticateUser = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const user = jwt.verify(token, "secret key");
    User.findByPk(user.userId).then((user) => {
      req.user = user;
      next();
    });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: false });
  }
};

module.exports = authenticateUser;
