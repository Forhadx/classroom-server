const express = require("express");

const attendanceController = require("../controllers/Attendance");
const HttpError = require("../util/http-error");

const router = express.Router();

router.post("/api/f/attendance", attendanceController.addNewAttendance);

router.post(
  "/api/f/attendance/mark",
  attendanceController.markAllStdentAttendance
);

router.get("/api/hi", async (req, res, next) => {
  const error = new HttpError("error made by me!!!", 500);
  return next(error);
});

module.exports = router;
