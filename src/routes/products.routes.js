const express = require('express');
const { productController } = require('../controllers');

const router = express.Router(); 

router.get('/search', productController.searchProductQuery);

router.get('/', productController.findAllProducts);

router.get('/:id', productController.findById);

router.post('/', productController.insertNewProduct);

router.put('/:id', productController.updateProduct);

router.delete('/:id', productController.deleteProduct);

module.exports = router;
