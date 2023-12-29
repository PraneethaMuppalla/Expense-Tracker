const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../model/user");

function checkStringInvalid(string) {
  if (!string || string.length === 0) {
    return true;
  } else {
    return false;
  }
}

exports.postNewUser = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;
    if (
      checkStringInvalid(name) ||
      checkStringInvalid(email) ||
      checkStringInvalid(password)
    ) {
      return res.status(400).json({ err: "Bad parameters" });
    }
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

exports.generateToken = function (userId, userEmail) {
  token = jwt.sign(
    { id: userId, email: userEmail },
    process.env.SECRET_KEY_JWT
  );
  return token;
};

exports.isPremiumUser = (req, res, next) => {
  try {
    const isPremiumUser = req.user.isPremiumUser;
    res.status(200).json({ isPremiumUser });
  } catch (err) {
    res.status(500).json({ success: false, err: err });
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (checkStringInvalid(email) || checkStringInvalid(password)) {
      return res.status(400).json({ err: "Bad parameters" });
    }
    const users = await User.findAll({ where: { email: email } });
    const user = users[0];
    if (!user) {
      //not found
      res.status(404).json({ msg: "User not found" });
    } else {
      const passwordsMatch = await bcrypt.compare(password, user.password);
      if (passwordsMatch) {
        const token = this.generateToken(user.id, user.email);
        res.status(200).json({
          success: true,
          msg: "Successful Login",
          token,
        });
      } else {
        //unauthorized
        res
          .status(401)
          .json({ success: false, msg: "User or password is incorrect" });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: err });
  }
};
