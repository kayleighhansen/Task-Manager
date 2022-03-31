const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const companyController = require('../controllers/company');
const company = require('../models/company');

<<<<<<< HEAD
router.get('/companies', companyController.getCompanies); //, taskController.createTask 

router.get('/company/:companyId', companyController.getCompany); //, taskController.getTasks

// router.post('/companies/addcompany/:{companyId}', companyController.createCompany); //, taskController.getTasks

// router.put('/companies/updateCompany/:{companyId}', companyController.updateCompany); //, taskController.getTask

// router.delete('companies/deleteCompany/:{companyId}', company.deleteCompany); //, taskController.updateTask 
=======
router.get('/companies', companyController.getCompanies);

router.get('/company', companyController.getCompany);
>>>>>>> 582008be3ef1505993f2feaf5725cc053840961f

module.exports = router;
