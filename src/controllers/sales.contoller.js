const { salesService } = require('../services');

const findAllSales = async (_req, res) => {
  const { message } = await salesService.findAll();
  res.status(200).json(message);
};

module.exports = {
  findAllSales,
};