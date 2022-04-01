const Sequelize = require("sequelize");

// console.log(process.env);

// const sequelizeDb = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     dialect: process.env.DB_DIALECT,
//     port: 3306,
//     host: process.env.HOST,
//   }
// );

const sequelizeDb = new Sequelize(
  "bqlfrop78volwwppwwbm",
  "uddq7uuismiwiirc",
  "xObNRGQg5YLxRSMzxYCr",
  {
    dialect: "mysql",
    port: 3306,
    host: "bqlfrop78volwwppwwbm-mysql.services.clever-cloud.com",
  }
);

module.exports = sequelizeDb;
