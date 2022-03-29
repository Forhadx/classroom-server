const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Note = sequelize.define("note", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  post: {
    type: Sequelize.STRING(1234),
  },
  file: {
    type: Sequelize.STRING,
  },
});

module.exports = Note;
