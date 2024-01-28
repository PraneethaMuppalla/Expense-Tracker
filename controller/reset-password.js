const bcrypt = require("bcrypt");
const Sib = require("sib-api-v3-sdk");
const { v4: uuidv4 } = require("uuid");

const rootDir = require("../util/path");
const User = require("../model/user");
const ResetPassword = require("../model/reset-password");

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, msg: "User doesn't exist with this email" });
    }
    const uuidId = uuidv4();
    const resetPasswordReq = new ResetPassword({
      id: uuidId,
      isActive: true,
      userId: user._id,
    });
    await resetPasswordReq.save();
    const client = Sib.ApiClient.instance;
    const apiKey = client.authentications["api-key"];
    apiKey.apiKey = process.env.SIB_KEY;
    const transEmailApi = new Sib.TransactionalEmailsApi();
    const sender = {
      //email used for registering the account
      email: "lakshmimuppalla2453@gmail.com",
      name: "Praneetha",
    };
    const receivers = [
      {
        email: email,
      },
    ];
    const emailResponse = await transEmailApi.sendTransacEmail({
      sender,
      To: receivers,
      subject: "Expense Tracker Reset Password",
      htmlContent: `<h3>Forgot Password</h3><a href="http://localhost:3000/password/resetpassword/${uuidId}">Click here</a>`,
    });
    console.log("respnose ====>>>>>>" + JSON.stringify(emailResponse));
    res.send({});
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: err });
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const uuid = req.params.uuidId;
    const obj = await ResetPassword.findOne({ id: uuid });
    // console.log("object" + obj + "isActive" + obj.isActive);
    if (obj && obj.isActive) {
      return res.send(`<form action="/password/updatePassword" method="POST">
      
      <input type="hidden" value="${uuid}" name="uuid"  />
      <label>Enter Password</label>
      <br />
      <br />
      <input type="password" name="password"  />
      <br />
      <br />
      <button type="submit" >Ok</button>
      </form>`);
    }
    return res.send(`<h1>This link has expired</h1>`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: err });
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const { uuid, password } = req.body;
    const hashedPw = await bcrypt.hash(password, 10);
    const forgotPasswordRow = await ResetPassword.findOne({ id: uuid });
    if (forgotPasswordRow && forgotPasswordRow.isActive) {
      forgotPasswordRow.isActive = false;
      await forgotPasswordRow.save();
      const user = await User.findOne({ _id: forgotPasswordRow.userId });
      user.password = hashedPw;
      res.json({ success: true });
      await user.save();
    } else {
      res.status(409).json({ success: false, msg: "Link already expired" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
  }
};
