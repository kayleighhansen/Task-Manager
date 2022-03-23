const path = require('path');
const bcrypt = require('bcryptjs');
const db = require('../models/user');
const User = db.User;

// TODO: Add other user logic here and in the user.js route
exports.signup = (req, res, next) => {
   // This probably needs to be converted to 'signup'.
   if (!req.body.email || !req.body.password || !req.body.company) {
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
}

exports.login = (req, res, next) => {
   const email = req.body.email;
   const password = req.body.password;

   User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return res.status(422).render('auth/login', {
          path: '/login',
          pageTitle: 'Login',
          errorMessage: 'Invalid email or password.',
          oldInput: {
            email: email,
            password: password
          }
          // validationErrors: []
        });
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            // req.session.isLoggedIn = true;
            // req.session.user = user;
            // return req.session.save(err => {
            //   console.log(err);
              // res.redirect('/');
            // });
            return res.status(200);
          }
          return res.status(422).render('/login', {
            path: '/login',
            pageTitle: 'Login',
            errorMessage: 'Invalid email or password.',
            oldInput: {
              email: email,
              password: password
            }
            // validationErrors: []
          });
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login');
        });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });

   res.render('auth/login')
   return;
}

exports.logout = (req, res, next) => {}

// exports.test = (req, res, next) => {
//    res.sendFile(path.join(__dirname + "/index.html"));
// }

// exports.info = (req, res, next) => {
//    res.status(200).json({
//       name: "Dude",
//       email: "email@cool.com"
//    });
// }

