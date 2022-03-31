const path = require("path");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const sequelizeDb = require("./util/database");

const authRoutes = require("./routes/authRoutes");
const roomRoutes = require("./routes/roomRoutes");
const teamRoutes = require("./routes/teamRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const noteRoutes = require("./routes/noteRoutes");

const Faculty = require("./models/Faculty");
const Student = require("./models/Student");
const Room = require("./models/Room");
const Team = require("./models/Team");
const TeamList = require("./models/Team-list");
const Attendance = require("./models/Attendance");
const AttendanceList = require("./models/AttendanceList");
const Note = require("./models/Note");

//ASSOCIATIONS
Room.belongsTo(Faculty, { constraints: true, onDelete: "CASCADE" });
Faculty.hasMany(Room);
Team.belongsTo(Room);
Room.hasOne(Team);
Team.belongsToMany(Student, { through: TeamList });
Student.belongsToMany(Team, { through: TeamList });
Attendance.belongsTo(Room);
Room.hasMany(Attendance);
Student.belongsToMany(Attendance, { through: AttendanceList });
Attendance.belongsToMany(Student, { through: AttendanceList });
Room.hasMany(Note);
Note.belongsTo(Room, { constraints: true, onDelete: "CASCADE" });

// sequelizeDb
//   .authenticate()
//   .then(() => {
//     console.log("Connection has been established successfully.");
//   })
//   .catch((err) => {
//     console.error("Unable to connect to the database:", err);
//   });

sequelizeDb
  .sync()
  // .sync({ force: true })
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// sequelizeDb.sync({ force: true });

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static(path.join("uploads")));

// app.use(async (req, res, next) => {
//   try {
//     const faculty = await Faculty.findByPk(1);
//     req.faculty = faculty;
//     next();
//   } catch (err) {
//     console.log(err);
//   }
// });

app.use("/", authRoutes);
app.use("/", roomRoutes);
app.use("/", teamRoutes);
app.use("/", attendanceRoutes);
app.use("/", noteRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Could not find this page." });
});

// app.use((error, req, res, next) => {
//   if (req.file) {
//     fs.unlink(req.file.path, (err) => {
//       console.log(err);
//     });
//   }
//   if (res.headerSent) {
//     return next(error);
//   }

//   res
//     .status(error.code || 500)
//     .json({ message: error.message || "An unknown error occurred!" });
// });

// console.log("dot: ", process.env);

let PORT = process.env.PORT || process.env.API_PORT;
app.listen(PORT, () => {
  console.log(`start At ${PORT}`);
});
