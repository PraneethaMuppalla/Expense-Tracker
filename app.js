const path = require("path");

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const sequelise = require("./util/database");
const userRoutes = require("./routes/user");
const expenseRoutes = require("./routes/expense");
const purchaseRoutes = require("./routes/purchase");
const premiumRoutes = require("./routes/premium");
const forgotPwRoutes = require("./routes/forgotPw");
const reportsRoutes = require("./routes/reports");

const User = require("./model/user");
const Expenses = require("./model/expense");
const Order = require("./model/order");
const ForgotPw = require("./model/forgotPw");

// express instance
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: "true" }));
app.use(cors());
dotenv.config();
// middle ware
app.use(userRoutes);
app.use("/expenses", expenseRoutes);
app.use("/purchase", purchaseRoutes);
app.use("/premium", premiumRoutes);
app.use("/password", forgotPwRoutes);
app.use(reportsRoutes);

User.hasMany(Expenses, { constraints: true, onDelete: "CASCADE" });
Expenses.belongsTo(User);

User.hasMany(Order, { constraints: true, onDelete: "CASCADE" });
Order.belongsTo(User);

User.hasMany(ForgotPw, { constraints: true, onDelete: "CASCADE" });
ForgotPw.belongsTo(User);

sequelise
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.error(error);
  });
