const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const port = process.env.PORT || 8080;
const app = express();

const MONGODB_URI =
  process.env.MONGODB_URL || `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.l3pd9.mongodb.net/shop?retryWrites=true&w=majority`;

app.use(bodyParser.json())
   .use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      next();
   })
   .use('/', require('./routes'));

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
