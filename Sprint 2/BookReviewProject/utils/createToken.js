const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports.createJWT = (id) => {
  return jwt.sign({ id }, config.jwt, { expiresIn: config.expiresIn });
};
