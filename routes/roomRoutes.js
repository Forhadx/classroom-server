const express = require("express");
const { body } = require("express-validator");

const Room = require("../models/Room");
const teamController = require("../controllers/Room");

const router = express.Router();

router.post(
  "/api/f/room",
  [
    body("name", "must have room name")
      .trim()
      .notEmpty()
      .isLength({ min: 3, max: 20 })
      .custom((value, { req }) => {
        return Room.findOne({
          where: { name: value, facultyId: req.faculty.id },
        }).then((room) => {
          if (room) {
            console.log("entry...");
            return Promise.reject("room already exists.");
          }
        });
      }),
  ],
  teamController.addRoom
);

module.exports = router;
