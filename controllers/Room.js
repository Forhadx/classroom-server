const Room = require("../models/Room");
const { validationResult } = require("express-validator");
const { nanoid } = require("nanoid");

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
      return res.status(400).json({ message: 'couldn"t be fetch all rooms' });
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
