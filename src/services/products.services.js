const { productModel } = require('../models');

const findAll = async () => {
  const data = await productModel.findAll();
  return { type: null, message: data };
};

const findById = async (id) => {
  const data = await productModel.findById(id);
  if (!data) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  console.log({ type: null, message: data });
  return { type: null, message: data };
};

module.exports = {
  findAll,
  findById,
};