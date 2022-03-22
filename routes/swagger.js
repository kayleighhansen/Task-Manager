const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
// TODO: uncomment this stuff
const swaggerDocument = require('../project_management-Library-1.0.0-resolved.json');
router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));

module.exports = router;
