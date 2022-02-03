const connectDB = require("./db/connect");
const express = require("express");
const app = express();
const routes = require('./routes/login')
require('dotenv').config();
require('express-async-errors');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler')

//basic middleware
app 
    .use(express.static('./public'))
    .use([express.urlencoded({ extended: false }), express.json()])
    .get("/", (req, res) => res.send(`<h1>JWT Basics</h1>`))
    .use('/api/v1', routes)
    .use(errorHandlerMiddleware)
    .use(notFound)

    // .use(errorHandlerMiddleware);
    // .use(notFound);
    
//app that listens on port 3000 || .env

//routes to /api/v1
const port = process.env.PORT || 3000;


const startApp = () => {
  try {
    connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`listening @ ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

startApp();
