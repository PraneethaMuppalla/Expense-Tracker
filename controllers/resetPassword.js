const Sib = require("sib-api-v3-sdk");

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const client = Sib.ApiClient.instance;
    const apiKey = client.authentications["api-key"];
    apiKey.apiKey = process.env.SIB_KEY;
    const transEmailApi = new Sib.TransactionalEmailsApi();
    const sender = {
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
      textContent: "Link Below",
      htmlContent: `<h3>Hello Krishna</h3>`,
    });
    console.log(emailResponse);
    res.send({});
  } catch (err) {
    console.error(err);
  }
};
