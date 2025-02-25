// Root routes put into server.js file, to match the swagger documentation path for each route,
// no prefix routes before login, signup, task, etc. 

const express = require('express');
const router = express.Router();

router.use('/api-docs', require('./swagger'));
router.use('/', require('./auth'));
router.use('/task', require('./task'));

module.exports = router;
