const Sequelize = require("sequelize");
const sequelise = require("../util/database");

const downloadedFiles = sequelise.define("downloadedFiles", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  fileUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = downloadedFiles;
