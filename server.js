const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// putting routes here in instead of the index file
const swagger = require('./routes/swagger');
const taskRoutes = require('./routes/task');
const authRoutes = require('./routes/auth');
// const companyRoutes = require('./routes/company');

const port = process.env.PORT || 8080;
const app = express();

const MONGODB_URI =
  process.env.MONGODB_URL || `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.j6osm.mongodb.net/task?retryWrites=true&w=majority`;

app.use(cors());

// for the restful api 
app.use(bodyParser.json())
   .use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      next();
   })
   // putting routes here in instead of the index file
   .use('/api-docs', swagger)
   .use('/user', authRoutes)
   .use('/tasks', taskRoutes);
   // .use('/company', companyRoutes)


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
