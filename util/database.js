const { Sequelize } = require("sequelize");

//sequelise --> promise base orm tool

//sequelize instance
const db = new Sequelize("expense-tracker", "root", "1234", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = db;
