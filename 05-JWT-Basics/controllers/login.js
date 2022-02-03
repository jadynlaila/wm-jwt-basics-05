// login function returns a json with succes

// const CustomAPIError = require("../errors/custom-error");
const { BadRequestError } = require("../errors");
const jwt = require('jsonwebtoken')
require("dotenv").config();

const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  // res.send('temp login/register/signup route')

  //there are 3 big way to verify username/ password
  //best - worst
  //mongoose validation
  //joi
  //controller

  if (!username || !password) {
    throw new BadRequestError("please provide email and password");
  }

  //this is just an example in the future this will come from mongoDB
  const id = new Date().getDate();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ status: 200, msg: "success- User Created", token });
};
//dashboard function returns a json with success

const dashboard = async (req, res) => {
  // throw new CustomAPIError('testing API error', 504)
  res.json({
    status: 200,
    msg: req.user.username ,
    secret: req.headers.authorization,
  });
};

module.exports = { dashboard, login };
