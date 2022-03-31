const express = require("express");

const attendanceController = require("../controllers/Attendance");

const router = express.Router();

router.post("/api/f/attendance", attendanceController.addNewAttendance);

router.post(
  "/api/f/attendance/mark",
  attendanceController.markAllStdentAttendance
);

module.exports = router;
