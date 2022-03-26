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
      console.log('room couldn"t be created');
    }
    await room.createTeam();
    res.json({
      message: "room create successfully",
      roomName: room.roomName,
      roomCode: room.roomCode,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Couldn't add new room. Try again!" });
  }
};
