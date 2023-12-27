const { Sequelize } = require("sequelize");

//sequelise --> promise base orm tool

//sequelize instance
const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.DB_HOST,
  }
);

module.exports = db;
