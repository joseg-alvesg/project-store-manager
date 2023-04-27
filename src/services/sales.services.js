const { salesModel } = require('../models');

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

module.exports = {
  findAll,
  findById,
};