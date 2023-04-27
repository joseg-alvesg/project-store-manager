const { salesModel } = require('../models');

const findAll = async () => {
  const data = await salesModel.findAll();
  return { type: null, message: data };
};

const findById = async (id) => {
  const data = await salesModel.findById(id);
  return { type: null, message: data };
}; 

module.exports = {
  findAll,
  findById,
};