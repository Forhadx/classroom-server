const Sequelize = require("sequelize");

const sequelizeDb = require("../util/database");

const AttendanceList = sequelizeDb.define("attendanceList", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  isAttend: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

module.exports = AttendanceList;
