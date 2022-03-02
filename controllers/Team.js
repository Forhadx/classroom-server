const Room = require("../models/Room");
const Student = require("../models/Student");

exports.addStudentToTeam = async (req, res, next) => {
  try {
    const token = req.body.token;
    const stdId = req.body.stdId;
    const room = await Room.findAll({ where: { token: token } });
    const team = await room[0].getTeam();
    const student = await Student.findByPk(stdId);
    team.addStudent(student);
    res.json({ room: room, team: team });
  } catch (err) {
    console.log(err);
  }
};
