const db = require('../models');
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
         res.status(201).send(data);
      })
      .catch((err) => {
         res.status(500).send({
            message:
               err.message || 'An error occurred while creating the user!',
         });
      });
};

// TODO: Add other user logic here and in the user.js route
