const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const sequelise = require("./util/database");

const userRoutes = require("./routes/user");
const expenseRouter = require("./routes/expense");
const purchaseRouter = require("./routes/purchase");
const premiumRoutes = require("./routes/premium");

const User = require("./model/user");
const Expenses = require("./model/expense");
const Order = require("./model/order");

// express instance
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
// middle ware
app.use(userRoutes);
app.use("/expenses", expenseRouter);
app.use("/purchase", purchaseRouter);
app.use("/premium", premiumRoutes);

User.hasMany(Expenses, { constraints: true, onDelete: "CASCADE" });
Expenses.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelise
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.error(error);
  });
