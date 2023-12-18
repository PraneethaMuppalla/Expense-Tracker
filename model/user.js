const Sequelize = require("sequelize");
const sequelise = require("../util/database");

const User = sequelise.define("users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: Sequelize.STRING,
});

module.exports = User;
