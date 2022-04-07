const express = require("express");

const attendanceController = require("../controllers/Attendance");
const facultyAuth = require("../middleware/faculty-auth");

const router = express.Router();

// router.post("/api/f/attendance", attendanceController.addNewAttendance);

router.post(
  "/api/f/attendance/mark",
  facultyAuth,
  attendanceController.markAllStdentAttendance
);

module.exports = router;
