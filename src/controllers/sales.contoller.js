const { salesService } = require('../services');

const findAllSales = async (_req, res) => {
  const { message } = await salesService.findAll();
  res.status(200).json(message);
};

const findSaleId = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.findById(+id);
  if (type) return res.status(404).json({ message });
  return res.status(200).json(message);
};

const insertSale = async (req, res) => {
  const { body } = req;
  const { type, message } = await salesService.insert(body);
  if (type === 'INVALID_ID') return res.status(400).json({ message });
  if (type === 'INVALID_QTY') return res.status(400).json({ message });
  if (type === 'INVALID_LENGTH') return res.status(422).json({ message });
  if (type) return res.status(404).json({ message });

  return res.status(201).json(message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.deleteRow(+id);
  if (type) return res.status(404).json({ message });
  res.sendStatus(204);
}; 

const updateSale = async (req, res) => {
  const { params: { id }, body } = req;
  const { type, message } = await salesService.update(+id, body);
  if (type === 'INVALID_ID') return res.status(400).json({ message });
  if (type === 'INVALID_QTY') return res.status(400).json({ message });
  if (type === 'INVALID_LENGTH') return res.status(422).json({ message });
  if (type) return res.status(404).json({ message });
  
  res.status(200).json(message);
};

module.exports = {
  findAllSales,
  findSaleId,
  insertSale,
  deleteSale,
  updateSale,
};