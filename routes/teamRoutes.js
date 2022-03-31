const express = require("express");

const teamController = require("../controllers/Team");
const facultyAuth = require("../middleware/faculty-auth");
const studentAuth = require("../middleware/student-auth");

const router = express.Router();

//Student
router.post(
  "/api/s/team/request",
  studentAuth,
  teamController.studentRequesToAddTeam
);

// Faculty
router.post(
  "/api/f/team/accept",
  facultyAuth,
  teamController.acceptStudentForTeam
);

router.post(
  "/api/f/team/remove",
  facultyAuth,
  teamController.removeStudentForTeam
);

router.post(
  "/api/f/team/students",
  // facultyAuth,
  teamController.FetchAllRoomStudents
);

module.exports = router;
