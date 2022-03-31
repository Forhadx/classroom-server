const Faculty = require("../models/Faculty");

const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers["authorization"];

  if (!token) {
    return res.status(403).send("A token is required for a authentication");
  }

  try {
    token = token.replace(/^Bearer\s+/, "");
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const faculty = await Faculty.findAll({ where: { id: decoded.facultyId } });
    if (!faculty) {
      res.status(422).json({ message: "Unauthoraize token!" });
    }
    req.faculty = faculty[0];
  } catch (err) {
    return res.json(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
