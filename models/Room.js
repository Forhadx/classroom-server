const Sequelize = require("sequelize");

const sequelizeDb = require("../util/database");

const Room = sequelizeDb.define("room", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  token: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Room;
