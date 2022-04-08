const Room = require("../models/Room");
const { validationResult } = require("express-validator");
const { nanoid } = require("nanoid");

const Team = require("../models/Team");
const TeamList = require("../models/Team-list");
const Student = require("../models/Student");

// FACULTY
exports.addRoom = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array()[0].msg });
  }

  try {
    const { roomName } = req.body;
    const room = await req.faculty.createRoom({
      roomName: roomName,
      roomCode: nanoid(6),
    });
    if (!room) {
      return res.status(400).json({ message: 'room couldn"t be created' });
    }
    await room.createTeam();
    res.status(201).json({
      message: "room create successfully",
      room: room,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Couldn't add new room. Try again!" });
  }
};

exports.getAllRooms = async (req, res, next) => {
  try {
    const rooms = await req.faculty.getRooms({
      order: [["updatedAt", "DESC"]],
    });
    if (!rooms) {
      return res.status(422).json({ message: 'couldn"t be fetch all rooms' });
    }
    res
      .status(200)
      .json({ message: "Fetch all rooms successfully", rooms: rooms });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Couldn't fetch all rooms. Try again!" });
  }
};

// STUDENT

exports.getAllStudentRooom = async (req, res, next) => {
  try {
    let roomIds = [];
    const studentTeamDetails = await Student.findOne({
      where: { id: 1 },
      include: Team,
    });
    if (!studentTeamDetails) {
      return res
        .status(422)
        .json({ message: 'Couldn"t be fetch all student teams' });
    }
    for (let key in studentTeamDetails.teams) {
      roomIds.push(studentTeamDetails.teams[key].roomId);
    }

    const rooms = await Room.findAll({
      where: { id: roomIds },
      order: [["updatedAt", "DESC"]],
    });
    if (!rooms) {
      return res.status(422).json({ message: 'couldn"t be fetch all rooms' });
    }
    res.status(200).json({ message: "Fetch all studen rooms", rooms: rooms });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Couldn't fetch all rooms. Try again!" });
  }
};
