const express = require('express');
const { productController } = require('../controllers');

const router = express.Router(); 

router.get('/', productController.findAllProducts);

router.get('/:id', productController.findById);

router.post('/', productController.insertNewProduct);

module.exports = router;
