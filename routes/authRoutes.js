const express = require("express");
const { body } = require("express-validator");

const Faculty = require("../models/Faculty");
const Student = require("../models/Student");
const authController = require("../controllers/auth");
const fileUpload = require("../middleware/fileUrl");

const router = express.Router();

router.post(
  "/api/f/signup",
  fileUpload.single("image"),
  [
    body("email", "enter a valid email")
      .isEmail()
      .normalizeEmail()
      .custom((value, { req }) => {
        return Faculty.findOne({ where: { email: value } }).then((faculty) => {
          if (faculty) {
            return Promise.reject("email already exist");
          }
        });
      }),
    body("password", "password is required").trim().isLength({ min: 4 }),
    body("name", "enter your name").trim().notEmpty(),
  ],
  authController.facultySignup
);

router.post(
  "/api/f/login",
  [body("email", "enter a valid email").isEmail().normalizeEmail()],
  authController.facultyLogin
);

router.post(
  "/api/s/signup",
  fileUpload.single("image"),
  [
    body("email", "enter a valid email")
      // .isEmail()
      // .normalizeEmail()
      .custom((value, { req }) => {
        return Student.findOne({ where: { email: value } }).then((student) => {
          if (student) {
            return Promise.reject("email already exist");
          }
        });
      }),
    body("password", "password is required").trim().isLength({ min: 6 }),
    body("name", "enter your name").trim().notEmpty(),
  ],
  authController.studentSignup
);

router.post(
  "/api/s/login",
  [body("email", "enter a valid email").isEmail().normalizeEmail()],
  authController.studntLogin
);

module.exports = router;
