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
  password: { type: Sequelize.STRING, allowNull: false },
  isPremiumUser: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  totalExpenses:{
    type:Sequelize.INTEGER,
    allowNull:false,
    defaultValue:0
  }
});

module.exports = User;
