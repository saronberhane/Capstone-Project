const express = require("express")
const app = express();

//Midleweare 
app.use(express.json());
app.use(express.urlencoded({extended: false}));


module.exports = app;