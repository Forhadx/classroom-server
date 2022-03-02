const Room = require("../models/Room");
const Student = require("../models/Student");

exports.addNewAttendance = async (req, res, next) => {
  const room = await Room.findAll({ where: { id: 1 } });
  console.log("r: ", room[0].name);
  await room[0].createAttendance({ date: "day 1" });
};

exports.markAllStdentAttendance = async (req, res, next) => {
  const { studentIds } = req.body;
  console.log(studentIds);
  const room = await Room.findAll({ where: { id: 1 } });
  attendance = await room[0].getAttendances();
  console.log(attendance);
  const student = await Student.findByPk(1);

  student.attendanceList = { isAttend: true };
  // console.log("std: ", student);
  await attendance[0].addStudent(student);

  res.json({ message: "add succesfully?" });
  // console.log(attendance);
};
