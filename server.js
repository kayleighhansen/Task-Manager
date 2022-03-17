const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const port = process.env.PORT || 8080;
const app = express();

const MONGODB_URI =
   process.env.MONGODB_URL ||
   `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.j6osm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// const corsOptions = {
//    origin: "https://cse341-wdd330-task-manager.herokuapp.com/",
//    optionsSuccessStatus: 200
//  };
app.use(cors());

// for the restful api
app.use(bodyParser.json())
   .use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader(
         'Access-Control-Allow-Methods',
         'OPTIONS, GET, POST, PUT, PATCH, DELETE'
      );
      res.setHeader(
         'Access-Control-Allow-Headers',
         'Content-Type, Authorization'
      );
      next();
   })
   // auth routes
   .use('/', require('./routes/index'));

// mongoose db connection
mongoose
   .connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => {
      app.listen(port, () => {
         console.log(`DB Connected and server running on ${port}.`);
      });
   })
   .catch((err) => {
      console.log('Cannot connect to the database!', err);
      process.exit();
   });
