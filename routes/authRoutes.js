const express = require("express");
const { body } = require("express-validator");

const Faculty = require("../models/Faculty");
const Student = require("../models/Student");
const authController = require("../controllers/auth");

const router = express.Router();

router.post(
  "/api/f/signup",
  [
    body("email", "enter a valid email")
      .isEmail()
      .normalizeEmail()
      .custom((value, { req }) => {
        return Faculty.findOne({ where: { email: value } }).then((faculty) => {
          if (faculty) {
            console.log("entry");
            return Promise.reject("email already exist");
          }
        });
      }),
    body("password", "password is required").trim().isLength({ min: 6 }),
    body("name", "enter your name").trim().notEmpty(),
    body("image", "upload facult image"),
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
  [
    body("email", "enter a valid email")
      .isEmail()
      .normalizeEmail()
      .custom((value, { req }) => {
        return Student.findOne({ where: { email: value } }).then((student) => {
          if (student) {
            console.log("entry");
            return Promise.reject("email already exist");
          }
        });
      }),
    body("password", "password is required").trim().isLength({ min: 6 }),
    body("name", "enter your name").trim().notEmpty(),
    body("image", "upload facult image"),
  ],
  authController.studentSignup
);

router.post(
  "/api/s/login",
  [body("email", "enter a valid email").isEmail().normalizeEmail()],
  authController.studntLogin
);

module.exports = router;
