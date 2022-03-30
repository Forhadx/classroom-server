const Room = require("../models/Room");
const Student = require("../models/Student");
const TeamList = require("../models/Team-list");

exports.addStudentToTeam = async (req, res, next) => {
  try {
    // const roomCode = req.body.roomCode;
    // const stdId = req.body.stdId;
    // const room = await Room.findAll({ where: { roomCode: roomCode } });
    const room = await Room.findAll({ where: { id: 1 } });
    const team = await room[0].getTeam();
    // console.log(team);

    // const student = await Student.findByPk(stdId);
    // team.addStudent(student);

    TeamList.create({
      teamId: team.id,
      isAccept: false,
      studentId: 1,
    });
    res.json({ message: "Student request send successfully!" });
  } catch (err) {
    console.log(err);
  }
};
