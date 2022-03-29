const express = require("express");

const fileUpload = require("../middleware/fileUrl");
const noteController = require("../controllers/Note");

const router = express.Router();

router.post("/api/f/note", fileUpload.single("file"), noteController.addNote);

router.post("/api/f/notes", noteController.fetchAllNotes);

router.get("/api/f/note/download/:id", noteController.downloadNotePdf);

module.exports = router;
