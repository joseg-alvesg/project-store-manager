const { productModel } = require('../models');
const { validations } = require('../utils');

const findAll = async () => {
  const data = await productModel.findAll();
  return { type: null, message: data };
};

const findById = async (id) => {
  const data = await productModel.findById(id);
  if (!data) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: data };
};

const insert = async (product) => {
  const error = await validations.validateName(product);
  if (error && error.type) {  
    return error;
  }
  
  const data = await productModel.insert(product);
  if (!data) return { type: 'CREATION_ERROR', message: 'error when insert new product' };
  return { type: null, message: { id: data, name: product } };
};

const update = async (id, product) => {
  const error = await validations.validateName(product);
  if (error && error.type) return error;

  const data = await productModel.update(id, product);

  if (!data) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: { id, name: product } };
};

const deleteRow = async (id) => {
  const data = await productModel.deleteRow(id);
  if (!data) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: '' };
};

const searchByQuery = async (q) => {
  const data = await productModel.searchByQuery(q);
  return { type: null, message: data };
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
  deleteRow,
  searchByQuery,
};