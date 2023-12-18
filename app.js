const express = require("express");
const cors = require("cors");

const sequelise = require("./util/database");
const userRoutes = require("./routes/user");

// express instance
const app = express();
app.use(express.json());
app.use(cors());
// middle ware
app.use(userRoutes);

sequelise
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.error(error);
  });
