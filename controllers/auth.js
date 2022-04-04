const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const Faculty = require("../models/Faculty");
const Student = require("../models/Student");

//========= FACULTY ==============
exports.facultySignup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array()[0].msg });
  }

  try {
    let imageUrl = "";
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const hashPw = await bcrypt.hash(password, 12);
    if (!req.file) {
      return res.status(422).res({ json: "Faculty image not found!" });
    }
    imageUrl = req.file.path.replace(/\\/g, "/");

    await Faculty.create({
      email: email,
      password: hashPw,
      name: name,
      image: imageUrl,
    });
    res.status(201).json({ message: "Faculty added" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Faculty couldn't signup now. Try again." });
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
      return res.status(422).json({ message: "Faculty not found!" });
    }
    const isEqual = await bcrypt.compare(password, faculty.password);
    if (!isEqual) {
      return res.status(409).json({ message: "Faculty password not match!" });
    }
    const token = jwt.sign(
      {
        email: email,
        facultyId: faculty.id,
      },
      process.env.TOKEN_KEY,
      { expiresIn: "30d" }
    );
    res.status(200).json({
      message: "Faculty login successfully",
      token: token,
      facultyId: faculty.id,
      expiresIn: "30d",
    });
  } catch (err) {
    res.status(500).json({ message: "Faculty couldn't login now. Try again." });
  }
};

//=========== STUDENT ===============
exports.studentSignup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array()[0].msg });
  }

  try {
    // console.log("req.body ", req.body);
    let imageUrl = "";
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    // const image = req.body.image;
    const hashPw = await bcrypt.hash(password, 12);

    if (!req.file) {
      return res.status(422).res({ json: "Student image not found!" });
    }
    imageUrl = req.file.path.replace(/\\/g, "/");

    await Student.create({
      email: email,
      password: hashPw,
      name: name,
      image: imageUrl,
    });
    res.status(201).json({ message: "Student added" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Student couldn't signup now. Try again." });
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
      return res.status(422).json({ message: "Student not found!" });
    }
    const isEqual = await bcrypt.compare(password, student.password);
    if (!isEqual) {
      return res.status(409).json({ message: "Student password not match!" });
    }
    const token = jwt.sign(
      {
        email: email,
        studentId: student.id,
      },
      process.env.TOKEN_KEY,
      { expiresIn: "30d" }
    );
    res.status(200).json({
      message: "Student login successfully",
      token: token,
      studentId: student.id,
      expiresIn: "30d",
    });
  } catch (err) {
    res.status(500).json({ message: "Student couldn't login now. Try again." });
  }
};
