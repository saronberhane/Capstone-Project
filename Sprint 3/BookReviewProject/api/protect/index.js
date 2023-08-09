const jwt = require("jsonwebtoken");
const configs = require("../../configs")

const user = require("../User/model");
const UserModel = require("../User/model");

//protection route
module.exports = async (req, res, next) => {
    try {
        let token = "";

        //get the token
        if (
            req.headers.authorization && 
            req.headers.authorization.split(" ")[0] === "Bearer"
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        //checking the token
        if (!token) return res.send("Please login");

        //verifiying the token
        const data = jwt.verify(token, configs.jwt);

        //check user
        const user = await UserModel.findOne({ _id: data.id });

        //attach user on request object
        req.user = user;

        next();
    } catch (error) {
        console.error(error);
    }
};