const Sequelize = require("sequelize");

const sequelizeDb = require("../util/database");

const Room = sequelizeDb.define("room", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  roomName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  roomCode: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Room;
