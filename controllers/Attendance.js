const Room = require("../models/Room");
const AttendanceList = require("../models/AttendanceList");

exports.markAllStdentAttendance = async (req, res, next) => {
  console.log("entry--");
  const { studentList, roomCode } = req.body;
  const room = await Room.findAll({ where: { roomCode: roomCode } });
  let attendance = await room[0].createAttendance();

  for (let key in studentList) {
    await AttendanceList.create({
      studentId: studentList[key].id,
      isAttend: studentList[key].isAttend,
      attendanceId: attendance.id,
    });
  }

  res.json({ message: "add succesfully?" });
};
