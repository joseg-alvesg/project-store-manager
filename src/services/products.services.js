const { productModel } = require('../models');

const findAll = async () => {
  const data = await productModel.findAll();
  return { type: null, message: data };
};

module.exports = {
  findAll,
};