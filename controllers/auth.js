const path = require('path');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // JWT Academind Video: https://pro.academind.com/courses/767386/lectures/13902439
const User = require('../models/user');
const Company = require('../models/company')
const { validationResult } = require('express-validator');


exports.signup = (req, res, next) => {
   if (!req.body.email || !req.body.password || !req.body.company) {
      res.status(400).send({ message: 'Cannot provide empty content!' });
      return;
   }
  
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
   }
  
   const email = req.body.email;
   const first_name = req.body.first_name;
   const last_name = req.body.last_name;
   const password = req.body.password;
   const company = req.body.company;

   bcrypt
      .hash(password, 12)
      .then((hashedPw) => {
         const user = new User({
            email: email,
            password: hashedPw,
            first_name: first_name,
            last_name: last_name,
            company: company,
         });
// original code commented out, just to be sure that other code works before deleting
//          user
//          .save()
//          .then((data) => {
//             res.status(201).send({
//                message: 'Successfully created user!',
//             })
//          })
//          .catch((err) => {
//             res.status(500).send({
//                message:
//                   err.message || 'An error occurred while creating the user!',
//             });
//          });
//       })
         return user.save();
      })
      .then((data) => { // TODO: Delete this, it's only for testing purposes
         Company
         .findOne({company_name: company})
         .then(comp => {
            console.log(comp);
            let new_company;
            if (!comp) {
               new_company = new Company({
                  company_name: company,
                  logo: "https://www.southcharlottefamilycounseling.com/wp-content/uploads/2015/10/cropped-logo-dummy.png",
                  employees: [
                     data._id // Potentially import mongoose id??
                  ],
                  tasks: []
               })
            }
            else {
               new_company = comp;
               user_array = new_company.employees;
               user_array.push(data._id);
               new_company.employees = user_array;
            }
            console.log(new_company)
            return new_company.save();
         })
         .catch(err => {
            res.status(500).send({
               message: err.message || 'An error occurred while creating the company!',
            });
         })
         res.status(201).send(data._id); // Change this to return something else???
      })
      .catch((err) => {
         res.status(500).send({
            message:
               err.message || 'An error occurred while creating the user!',
         });
      });
/*       User.findOne({email: email}).then(user => {
         user_id_for_company = user._id
         Company
         .findOne({company_name: company})
         .then(data => {
            console.log(data);
            console.log(user_id_for_company)
            let new_company;
            if (!data) {
               new_company = new Company({
                  company_name: company,
                  logo: "https://www.southcharlottefamilycounseling.com/wp-content/uploads/2015/10/cropped-logo-dummy.png",
                  employees: [
                     user_id_for_company // Potentially import mongoose id??
                  ],
                  tasks: []
               })
            }
            else {
               new_company = data;
               user_array = new_company.employees;
               user_array.push(user_id_for_company);
               new_company.employees = user_array;
            }
            return new_company.save();
         })
      }); */
};

exports.login = (req, res, next) => {
   const email = req.body.email;
   const password = req.body.password;

   User.findOne({ email: email })
      .then((user) => {
         if (!user) {
            return res.status(422);
         }
         bcrypt
            .compare(password, user.password)
            .then((doMatch) => {
               if (doMatch) {
                  accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" }); //This creates the JWT token
                  return res.status(200).json({ accessToken: accessToken });
               }
               return res.status(422);
            })
            .catch((err) => {
               console.log(err);
               return res.status(500);
            })
      })
      .catch((err) => {
         console.log(err);
         return res.status(500);
      });
};

exports.logout = (req, res, next) => {
   const authHeader = req.headers['authorization'];

   jwt.sign(authHeader, '', {expiresIn: 1}, (logout, err) => {
      if (logout) {
         res.status(201).send({
            message: 'You have been Logged Out.'
         });
      } else {
         res.status(400).send({
            message: 'Error!'
         });
      };
   })
};

