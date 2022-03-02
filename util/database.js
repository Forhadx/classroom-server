const Sequelize = require("sequelize");

const sequelizeDb = new Sequelize("digital-attendance", "root", "1234", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelizeDb;
