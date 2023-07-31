const UserModel = require("./model");
const bcrypt = require("bcrypt");

const { createJWT } = require("../../utils/createToken");
const AppError = require("../../utils/appError");

//creating a login
module.exports.createUser = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const data = req.body;
    if (!email || !password || !firstName || !lastName) {
      return next(new AppError("Please provide your password, email, firstName, lastName", 400))
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    data.password = encryptedPassword;

    const user = await UserModel.create(data);

    res.status(201).json({
      message: "User Created",
      data: user,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};


//to login
module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("Invalid password of email", 400))
    }

    //search
    const user = await UserModel.find({ email: email });

    //does it exists
    if (user.length === 0) {
      return next(new AppError("Invalid password of email", 400))
    }

    //compare
    const checkUser = await bcrypt.compare(password, user[0].password);

    //validate
    if (!checkUser) {
      return next(new AppError("Invalid password of email", 400))
    }

    const token = createJWT(user[0].id);

    res.status(201).json({
        status: "SUCCESS",
        data: { user: user[0] },
        token,
      });
  } catch (error) {
    next(error)
  }
};
