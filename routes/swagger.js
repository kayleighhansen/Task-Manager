const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
// TODO: uncomment this stuff
// const swaggerDocument = require('../swaggerDesign.json');
router.use('/api-docs', swaggerUi.serve);
// router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;
