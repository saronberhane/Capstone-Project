const express = require("express");
const app = express();

//Routers
const user = require("../api/User/router");
const book = require("../api/Book/router");
// const geh = require("../api/geh");
// const Book = require("../api/Book/model");
// const User = require("../api/User/model");

//Midleweare
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/user", user);
app.use("/api/v1/book", book);

// app.use(geh);

module.exports = app;
