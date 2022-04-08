const Room = require("../models/Room");
const AttendanceList = require("../models/AttendanceList");

// ========== FACULTY ============
exports.markAllStdentAttendance = async (req, res, next) => {
  try {
    const { studentList, roomCode } = req.body;
    const room = await Room.findAll({ where: { roomCode: roomCode } });
    if (!room) {
      return res.status(422).json({ message: "Room not found!" });
    }
    let attendance = await room[0].createAttendance();
    if (!attendance) {
      return res.status(422).json({ message: "Couldn't created Attendace!" });
    }

    for (let key in studentList) {
      await AttendanceList.create({
        studentId: studentList[key].id,
        isAttend: studentList[key].isAttend,
        attendanceId: attendance.id,
      });
    }

    res.status(201).json({ message: "Attendace submitted succesfully?" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Attendace couldn't submitted. try again!" });
  }
};

exports.getAllRoomAttendances = async (req, res, next) => {
  try {
    const { roomCode } = req.body;
    const room = await Room.findAll({ where: { roomCode: roomCode } });
    if (!room) {
      return res.status(422).json({ message: "Room not found!" });
    }
    const attendanceList = await room[0].getAttendances({
      include: ["students"],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json({
      message: "Fetch all Attendances list successfully!",
      attendanceList: attendanceList,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Attendace lists couldn't fetch. try again!" });
  }
};

// ========== STUDENT ============
exports.getStudentRoomAttendance = async (req, res, next) => {
  try {
    const { roomCode } = req.body;
    const room = await Room.findAll({ where: { roomCode: roomCode } });
    if (!room) {
      return res.status(422).json({ message: "Room not found!" });
    }
    const attendanceList = await room[0].getAttendances({
      include: ["students"],
      order: [["createdAt", "DESC"]],
    });
    if (!attendanceList) {
      return res.status(422).json({ message: "Attendent list not found!" });
    }

    let attendanceDetails = [];
    for (let key_1 in attendanceList) {
      let detail = {
        id: attendanceList[key_1].id,
        createdAt: attendanceList[key_1].createdAt,
      };
      for (let key_2 in attendanceList[key_1].students) {
        if (+attendanceList[key_1].students[key_2].id === +req.student.id) {
          detail.isAttend =
            attendanceList[key_1].students[key_2].attendanceList.isAttend;
        }
      }
      attendanceDetails.push(detail);
    }

    res.status(200).json({
      message: "Student Attendance list fetch Successfully!",
      attendanceDetails: attendanceDetails,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Attendace lists couldn't fetch. try again!" });
  }
};
