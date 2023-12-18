const User = require("../model/user");

exports.postNewUser = async (req, res, next) => {
  try {
    console.log("hit");
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (user) {
      res.status(409).json({ error: "User already exists." });
    } else {
      const response = await User.create(req.body);
      res.status(201).json(response);
    }
  } catch (err) {
    console.error(err);
  }
};
