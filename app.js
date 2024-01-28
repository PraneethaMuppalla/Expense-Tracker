const path = require("path");
const fs = require("fs");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const userRoutes = require("./routes/user");
const expenseRoutes = require("./routes/expense");
const purchaseRoutes = require("./routes/purchase");
const premiumRoutes = require("./routes/premium");
const forgotPwRoutes = require("./routes/forgotPw");
const reportsRoutes = require("./routes/reports");

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

// express instance
const app = express();
// middle ware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: "true" }));
app.use(cors());
app.use(helmet());
app.use(morgan("combined", { stream: accessLogStream }));

//routes
app.use(userRoutes);
app.use("/expenses", expenseRoutes);
app.use("/purchase", purchaseRoutes);
app.use("/premium", premiumRoutes);
app.use("/password", forgotPwRoutes);
app.use(reportsRoutes);

app.use((req, res) => {
  console.log("hit");
  res.sendFile(path.join(rootDir, "public", "views", `${req.url}`));
});

mongoose
  .connect(process.env.MONGO_DRIVER)
  .then(() => {
    console.log("Connected to mongo db");
    app.listen(3000);
  })
  .catch((err) => {
    console.error(err);
  });
