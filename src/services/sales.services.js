const { salesModel, productModel } = require('../models');
const { validations } = require('../utils');

const findAll = async () => {
  const data = await salesModel.findAll();
  return { type: null, message: data };
};

const findById = async (sid) => {
  const data = await salesModel.findById(sid);
  if (!data || data.length < 1) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  const filteredData = data.map(({ id, saleId, ...rest }) => rest);
  return { type: null, message: filteredData };
};

const insert = async (sale) => {
  const error = await validations.validateProduct(sale);
  if (error && error.type) return error;

  const allProduct = await Promise.all(sale.map((s) => productModel.findById(s.productId)));
  const testProductId = allProduct.every((t) => t !== undefined);
  
  if (!testProductId) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  const id = await salesModel.insertSale();
  await sale.map(async (e) => salesModel.insertProduct(id, e));
  const forSale = { id, itemsSold: [...sale] };
  return { type: null, message: forSale };
};

const deleteRow = async (id) => {
  const data = await salesModel.deleteRow(id);
  if (!data) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  return { type: null, message: '' };
};

const update = async (id, sale) => {
  const error = await validations.validateProduct(sale);
  if (error && error.type) return error;
  
  const allProduct = await Promise.all(sale.map((s) => productModel.findById(s.productId)));
  const testProductId = allProduct.every((t) => t !== undefined);
  if (!testProductId) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  
  const byId = await salesModel.findById(id);
  if (byId.length < 1) return { type: 'PRODUCT_NOT_FOUND', message: 'Sale not found' };

  await sale.forEach((s) => salesModel.update(id, s));

   const forSale = { saleId: id, itemsUpdated: [...sale] };
  return { type: null, message: forSale };
};

module.exports = {
  findAll,
  findById,
  insert,
  deleteRow,
  update,
};