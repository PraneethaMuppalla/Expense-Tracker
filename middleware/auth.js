const jwt = require("jsonwebtoken");
const User = require("../model/user");

const authUser = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    console.log("token=====>>>>" + token);
    const userInformation = jwt.verify(token, process.env.SECRET_KEY_JWT);
    const userId = userInformation.id;
    const user = await User.findByPk(userId);
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ success: false, msg: "User is not authorized" });
  }
};

module.exports = authUser;
