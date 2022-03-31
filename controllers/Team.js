const Room = require("../models/Room");
const TeamList = require("../models/Team-list");

// Student section
exports.studentRequesToAddTeam = async (req, res, next) => {
  try {
    const roomCode = req.body.roomCode;
    const studentId = req.body.studentId;
    // const studentId = 1;
    const room = await Room.findAll({ where: { roomCode: roomCode } });
    if (!room) {
      return res.status(422).json({ message: "Room not found!" });
    }
    const team = await room[0].getTeam();
    if (!team) {
      return res.status(422).json({ message: "Team not found!" });
    }
    const student = await TeamList.findAll({
      where: { teamId: team.id, studentId: studentId },
    });
    if (student[0]) {
      return res
        .status(409)
        .json({ message: "Student already request for the room !" });
    }
    await TeamList.create({
      teamId: team.id,
      isAccept: false,
      studentId: studentId,
    });
    res.status(201).json({ message: "Student request send successfully!" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Student request couldn't send to room. try again!" });
  }
};

// Faculty
exports.acceptStudentForTeam = async (req, res, next) => {
  try {
    const roomCode = req.body.roomCode;
    const studentId = req.body.studentId;
    const room = await Room.findAll({ where: { roomCode: roomCode } });
    if (!room) {
      return res.status(422).json({ message: "Room not found!" });
    }
    const team = await room[0].getTeam();
    if (!team) {
      return res.status(422).json({ message: "Team not found!" });
    }
    const teamStudent = await TeamList.findAll({
      where: { teamId: team.id, studentId: studentId },
    });
    if (!teamStudent) {
      res.status(422).json({ message: "Student request not found in room" });
    }
    teamStudent[0].isAccept = true;
    await teamStudent[0].save();
    res
      .status(201)
      .json({ message: "Student add to room", teamStudent: teamStudent[0] });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Couldn't not accept student. try again!" });
  }
};

exports.removeStudentForTeam = async (req, res, next) => {
  try {
    const studentId = req.body.studentId;
    const student = await TeamList.findAll({ where: { studentId: studentId } });
    if (!student) {
      res.status(422).json({ message: "Student request not found in room" });
    }
    await student[0].destroy();
    res.status(200).json({ message: "Student request delete!" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Couldn't not remove student. try again!" });
  }
};

exports.FetchAllRoomStudents = async (req, res, next) => {
  try {
    const roomCode = req.body.roomCode;
    const room = await Room.findAll({ where: { roomCode: roomCode } });
    if (!room) {
      return res.status(422).json({ message: "Room not found!" });
    }
    const roomStudents = await room[0].getTeam({
      // where: { isAccept: true },
      include: ["students"],
    });
    if (!roomStudents) {
      return res.status(422).json({ message: "Team not found!" });
    }

    // const roomStudents = await TeamList.findAll({ where: { teamId: team.id } });
    // if (!roomStudents) {
    //   res.status(422).json({ message: "Couldn't fetch room students!" });
    // }

    res.status(200).json({
      message: "Fetch all room Student successfully",
      roomStudents: roomStudents,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Couldn't not remove student. try again!" });
  }
};
