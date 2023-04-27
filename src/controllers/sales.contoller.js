const { salesService } = require('../services');

const findAllSales = async (_req, res) => {
  const { message } = await salesService.findAll();
  res.status(200).json(message);
};

const findSaleId = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.findById(+id);
  return res.status(200).json(message);
};

module.exports = {
  findAllSales,
  findSaleId,
};