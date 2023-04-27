const express = require('express');
const { salesController } = require('../controllers');
// const { } = require('../controllers');

const router = express.Router();

router.get('/', salesController.findAllSales);

module.exports = router;
