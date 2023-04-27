const { salesModel } = require('../models');

const findAll = async () => {
  const data = await salesModel.findAll();
  return { type: null, message: data };
};

module.exports = {
  findAll,
};