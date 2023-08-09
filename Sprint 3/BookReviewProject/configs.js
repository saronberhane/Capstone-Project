const dotenv = require("dotenv");
dotenv.config({ path: "./configs.env" });

module.exports = {
  env: process.env.NODE_ENV,
  db: {
    remote: process.env.DB_REMOTE,
  },
  jwt:process.env.SECRET,
  expiresIn: process.env.EXPIRESIN
};
