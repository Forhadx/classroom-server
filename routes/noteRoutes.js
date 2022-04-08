const express = require("express");

const fileUpload = require("../middleware/fileUrl");
const noteController = require("../controllers/Note");
const facultyAuth = require("../middleware/faculty-auth");
const studentAuth = require("../middleware/student-auth");

const router = express.Router();

//========== FACULTY ==========
router.post(
  "/api/f/note",
  facultyAuth,
  fileUpload.single("file"),
  noteController.addNote
);

router.post("/api/f/notes", facultyAuth, noteController.fetchAllNotes);

router.get(
  "/api/f/note/download/:id",
  facultyAuth,
  noteController.downloadNotePdf
);

//========= STUDENT =========
router.post("/api/s/notes", studentAuth, noteController.fetchAllNotes);

router.get(
  "/api/s/note/download/:id",
  studentAuth,
  noteController.downloadNotePdf
);

module.exports = router;
