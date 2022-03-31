const express = require("express");
const { body } = require("express-validator");

const Room = require("../models/Room");
const teamController = require("../controllers/Room");
const facultyAuth = require("../middleware/faculty-auth");

const router = express.Router();

router.post(
  "/api/f/room",
  facultyAuth,
  [
    body("roomName", "must have room name")
      .trim()
      .notEmpty()
      .isLength({ min: 3, max: 20 })
      .custom((value, { req }) => {
        return Room.findOne({
          where: { roomName: value, facultyId: req.faculty.id },
        }).then((room) => {
          if (room) {
            return Promise.reject("room name already exists.");
          }
        });
      }),
  ],
  teamController.addRoom
);

router.get("/api/f/rooms", facultyAuth, teamController.getAllRooms);

module.exports = router;
