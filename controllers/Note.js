const path = require("path");

const Note = require("../models/Note");
const Room = require("../models/Room");

exports.addNote = async (req, res, next) => {
  try {
    let file = "";
    const { post, roomCode } = req.body;

    if (req.file) {
      file = req.file.path.replace(/\\/g, "/");
    }
    const room = await Room.findAll({ where: { roomCode: roomCode } });
    const note = await room[0].createNote({ post, file });
    res.status(201).json({ message: "add note successfully", note: note });
  } catch (err) {
    res.status(500).json({ message: "Couldn't add note. try again!" });
  }
};

exports.fetchAllNotes = async (req, res, next) => {
  const { roomCode } = req.body;
  try {
    const room = await Room.findAll({ where: { roomCode: roomCode } });
    if (!room) {
      return res.status(404).json({ message: "Wrong room code!" });
    }
    const notes = await room[0].getNotes({ order: [["updatedAt", "DESC"]] });
    if (!notes) {
      return res
        .status(200)
        .json({ message: "This room has no notes", notes: [] });
    }
    res
      .status(201)
      .json({ message: "fetch all notes successfully", notes: notes });
  } catch (err) {
    res.status(500).json({ message: "Couldn't fetch note. try again!" });
  }
};

exports.downloadNotePdf = async (req, res, next) => {
  const nId = req.params.id;
  try {
    const note = await Note.findByPk(nId);
    if (!note) {
      res.status(404).json({ message: "Pdf file couldn't found!" });
    }
    res.set({ "Content-Type": "application/pdf" });
    res.sendFile(path.join(__dirname, "..", note.file));
  } catch (err) {
    res.status(500).json({ message: "Couldn't download pdf. try again!" });
  }
};
