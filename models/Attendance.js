const Sequelize = require("sequelize");

const sequelizeDb = require("../util/database");

const Attendance = sequelizeDb.define("attendance", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  date: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Attendance;
