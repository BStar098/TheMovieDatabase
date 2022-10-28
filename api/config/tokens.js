const jwt = require("jsonwebtoken");
const SECRET = "tuki";

const generateToken = (payload) => {
  return jwt.sign(payload, SECRET, { expiresIn: "2h" });
};

const validateToken = (TOKEN) => {
  return jwt.verify(TOKEN, SECRET);
};

module.exports = { generateToken, validateToken };
