const path = require('path');
const db = require('../models/user');
const User = db.User;

exports.createUser = (req, res) => {
   // This probably needs to be converted to 'signup'.
   if (!req.body.email || !req.body.password) {
      res.status(400).send({ message: 'Cannot provide empty content!' });
      return;
   }

   const user = new User(req.body);
   user
      .save()
      .then((data) => {
         console.log(data);
         res.status(201).send(data._id);
      })
      .catch((err) => {
         res.status(500).send({
            message:
               err.message || 'An error occurred while creating the user!',
         });
      });
};

// TODO: Add other user logic here and in the user.js route
exports.signup = (req, res, next) => {
   return;
}

exports.login = (req, res, next) => {
   return;
}

exports.test = (req, res, next) => {
   res.sendFile(path.join(__dirname + "/index.html"));
}

exports.info = (req, res, next) => {
   res.status(200).json({
      name: "Dude",
      email: "email@cool.com"
   });
}
