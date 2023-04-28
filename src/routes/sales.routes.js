const express = require('express');
const { salesController } = require('../controllers');

const router = express.Router();

router.get('/', salesController.findAllSales);

router.get('/:id', salesController.findSaleId);

router.post('/', salesController.insertSale);

router.put('/:id', salesController.updateSale);

router.delete('/:id', salesController.deleteSale);

module.exports = router;
