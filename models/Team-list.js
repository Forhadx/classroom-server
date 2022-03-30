const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const TeamList = sequelize.define("teamList", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  isAccept: {
    type: Sequelize.BOOLEAN,
  },
});

module.exports = TeamList;
