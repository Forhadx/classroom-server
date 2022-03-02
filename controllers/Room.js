const Room = require("../models/Room");
const { validationResult } = require("express-validator");
const { nanoid } = require("nanoid");

exports.addRoom = async (req, res, next) => {
  //   console.log("rooM: ", req.faculty);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validator Error!");
    error.statusCode = 422;
    console.log(errors.array());
    error.data = errors.array();
    throw error;
  }

  try {
    const name = req.body.name;
    const room = await req.faculty.createRoom({
      name: name,
      token: nanoid(6),
    });
    if (!room) {
      console.log('room couldn"t be created');
    }
    await room.createTeam();
    res.json({ message: "room create successfully" });
  } catch (err) {
    console.log(err);
  }
};
