const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const Faculty = require("../models/Faculty");
const Student = require("../models/Student");
const keys = require("../config/keys");

//========= FACULTY ==============
exports.facultySignup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array()[0].msg });
  }

  try {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const image = req.body.image;
    const hashPw = await bcrypt.hash(password, 12);

    await Faculty.create({
      email: email,
      password: hashPw,
      name: name,
      image: image,
    });
    res.json({ message: "Faculty added" });
  } catch (err) {
    res.status(500).json({ message: "Couldn't signup now. Try again." });
  }
};

exports.facultyLogin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array()[0].msg });
  }

  try {
    const email = req.body.email;
    const password = req.body.password;
    const faculty = await Faculty.findOne({ where: { email: email } });
    if (!faculty) {
      console.log("not found");
    }
    const isEqual = await bcrypt.compare(password, faculty.password);
    if (!isEqual) {
      console.log("wrong password");
    }
    const token = jwt.sign(
      {
        email: email,
        facultyId: faculty.id,
      },
      keys.jwtSecret,
      { expiresIn: "30d" }
    );
    res.json({
      message: "login successfully",
      token: token,
      facultyId: faculty.id,
      expiresIn: "30d",
    });
  } catch (err) {
    res.status(500).json({ message: "Couldn't login now. Try again." });
  }
};

//=========== STUDENT ===============
exports.studentSignup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array()[0].msg });
  }

  try {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const image = req.body.image;
    const hashPw = await bcrypt.hash(password, 12);

    await Student.create({
      email: email,
      password: hashPw,
      name: name,
      image: image,
    });
    res.json({ message: "Faculty added" });
  } catch (err) {
    res.status(500).json({ message: "Couldn't signup now. Try again." });
  }
};

exports.studntLogin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array()[0].msg });
  }

  try {
    const email = req.body.email;
    const password = req.body.password;
    const student = await Student.findOne({ where: { email: email } });
    if (!student) {
      console.log("not found");
    }
    const isEqual = await bcrypt.compare(password, student.password);
    if (!isEqual) {
      console.log("wrong password");
    }
    const token = jwt.sign(
      {
        email: email,
        studentId: student.id,
      },
      keys.jwtSecret,
      { expiresIn: "30d" }
    );
    res.json({
      message: "login successfully",
      token: token,
      studentId: student.id,
      expiresIn: "30d",
    });
  } catch (err) {
    res.status(500).json({ message: "Couldn't login now. Try again." });
  }
};
