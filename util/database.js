const Sequelize = require("sequelize");

// const sequelizeDb = new Sequelize("digital-attendance", "root", "1234", {
//   dialect: "mysql",
//   host: "localhost",
// });

const sequelizeDb = new Sequelize(
  "bqlfrop78volwwppwwbm",
  "uddq7uuismiwiirc",
  "xObNRGQg5YLxRSMzxYCr",
  {
    dialect: "mysql",
    host: "bqlfrop78volwwppwwbm-mysql.services.clever-cloud.com",
  }
);

module.exports = sequelizeDb;
