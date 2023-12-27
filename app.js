const path = require("path");
const fs = require("fs");

const express = require("express");
const cors = require("cors");
//const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const sequelise = require("./util/database");
const userRoutes = require("./routes/user");
const expenseRoutes = require("./routes/expense");
const purchaseRoutes = require("./routes/purchase");
const premiumRoutes = require("./routes/premium");
const forgotPwRoutes = require("./routes/forgotPw");
const reportsRoutes = require("./routes/reports");
const rootDir = require("./util/path");

const User = require("./model/user");
const Expenses = require("./model/expense");
const Order = require("./model/order");
const ForgotPw = require("./model/forgotPw");
const FilesDownloaded = require("./model/downloadedFiles");

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

// express instance
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: "true" }));
app.use(cors());
//app.use(helmet());
app.use(morgan("combined", { stream: accessLogStream }));

// middle ware
app.use(userRoutes);
app.use("/expenses", expenseRoutes);
app.use("/purchase", purchaseRoutes);
app.use("/premium", premiumRoutes);
app.use("/password", forgotPwRoutes);
app.use(reportsRoutes);

app.use((req, res) => {
  res.sendFile(path.join(rootDir, "public", "views", `${req.url}`));
});

User.hasMany(Expenses, { constraints: true, onDelete: "CASCADE" });
Expenses.belongsTo(User);

User.hasMany(Order, { constraints: true, onDelete: "CASCADE" });
Order.belongsTo(User);

User.hasMany(ForgotPw, { constraints: true, onDelete: "CASCADE" });
ForgotPw.belongsTo(User);

User.hasMany(FilesDownloaded);
FilesDownloaded.belongsTo(User);

sequelise
  .sync()
  .then(() => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((error) => {
    console.error(error);
  });
