const { productService } = require('../services');

const findAllProducts = async (req, res) => {
  const { type, message } = await productService.findAll();
  res.status(200).json(message);
};

module.exports = {
  findAllProducts,
};