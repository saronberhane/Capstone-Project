const jwt = require("jsonwebtoken");
const config = require("../configs");

module.exports.createJWT = (id) => {
  return jwt.sign({ id }, config.jwt, { expiresIn: config.expiresIn });
};
