const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const authController = require('../controllers/auth');

router.put(
   '/signup',
   [
      body('email')
         .isEmail()
         .withMessage('Please enter a valid email.')
         .custom((value, { req }) => {
            return User.findOne({ email: value }).then((userDoc) => {
               if (userDoc) {
                  return Promise.reject('Email address exists already!');
               }
            });
         })
         .normalizeEmail(),
      body('password').trim().isLength({ min: 5 }),
      body('name').trim().not().isEmpty(),
   ],
   authController.signup
);

router.post('/login', authController.login); // TODO: Add all the other User Requests

router.post('/logout', authController.logout); // TODO: Add all the other User Requests

// router.get('/info', authController.info);

// router.get('/test', authController.test);

module.exports = router;
