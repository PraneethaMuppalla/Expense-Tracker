const express = require("express");
const cors = require("cors");

const sequelise = require("./util/database");
const userRoutes = require("./routes/user");
const expenseRouter = require("./routes/expense");
const User = require("./model/user");
const Expenses = require("./model/expense");

// express instance
const app = express();
app.use(express.json());
app.use(cors());
// middle ware
app.use(userRoutes);
app.use("/expenses", expenseRouter);

User.hasMany(Expenses, { constraints: true, onDelete: "CASCADE" });
Expenses.belongsTo(User);

sequelise
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.error(error);
  });
