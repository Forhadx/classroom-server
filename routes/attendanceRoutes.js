const express = require("express");

const attendanceController = require("../controllers/Attendance");
const facultyAuth = require("../middleware/faculty-auth");
const studentAuth = require("../middleware/student-auth");

const router = express.Router();

// ========== FACULTY ============
router.post(
  "/api/f/attendance/mark",
  facultyAuth,
  attendanceController.markAllStdentAttendance
);

router.post("/api/f/attendance", attendanceController.getAllRoomAttendances);

// ========== STUDENT ============
router.post(
  "/api/s/attendance",
  studentAuth,
  attendanceController.getStudentRoomAttendance
);
module.exports = router;
