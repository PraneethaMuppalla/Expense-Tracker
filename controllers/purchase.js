const Razorpay = require("razorpay");
const Order = require("../model/order");
const User = require("../model/user");
const userController = require("./user");

exports.purchasePremium = async (req, res) => {
  try {
    const rzp = new Razorpay({
      key_id: process.env.KEY_ID,
      key_secret: process.env.KEY_SECRET,
    });
    const amount = 5050;
    rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
      if (err) {
        throw new Error(JSON.stringify(err));
      }
      const newOrder = new Order({
        orderid: order.id,
        status: "PENDING",
        userId: req.user,
      });
      newOrder
        .save()
        .then(() => {
          return res
            .status(202)
            .json({ orderId: order.id, key_id: rzp.key_id });
        })
        .catch((err) => {
          throw new Error(err);
        });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      msg: "Something went wrong",
      error: err,
    });
  }
};

exports.updateTransactionStatus = async (req, res, next) => {
  let order;
  try {
    const { payment_id, order_id } = req.body;
    const userId = req.user.id;
    const order = await Order.findOne({
      where: {
        userId: userId,
        orderid: order_id,
      },
    });
    const promise1 = order.update({
      paymentid: payment_id,
      status: "SUCCESSFUL",
    });
    const promise2 = req.user.update({ isPremiumUser: true });
    const successOrder = await Promise.all([promise1, promise2]);
    return res.status(201).json({
      success: true,
      message: "Transaction Successful",
    });
  } catch (err) {
    console.error(err);
    const promise3 = req.user.update({ isPremiumUser: false });
    const promise4 = order.update({
      status: "FAIL",
    });
    try {
      await Promise.all([promise3, promise4]);
    } catch (error) {
      console.error("Error updating user and order in catch block:", error);
    }

    res.status(500).json({ error: err.message, success: false });
  }
};
