const express = require('express');
const { body } = require('express-validator'); //for validation purposes
const router = express.Router();

const taskController = require('../controllers/task');

router.get('/'); //, taskController.getTasks

router.post('/add-task'); //, taskController.createTask 

router.get('/task/:taskId'); //, taskController.getTask

router.put('/task/:{taskId}'); //, taskController.updateTask 

router.delete('/task/:{taskId}'); //, taskController.deleteTask 

// TODO: Add authentication for the task requests
module.exports = router;
