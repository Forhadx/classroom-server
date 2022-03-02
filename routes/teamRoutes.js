const express = require("express");

const teamController = require("../controllers/Team");

const router = express.Router();

router.post("/api/f/team", teamController.addStudentToTeam);

module.exports = router;
