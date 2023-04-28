const { productService } = require('../services');

const findAllProducts = async (req, res) => {
  const { message } = await productService.findAll();
  res.status(200).json(message);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.findById(+id);
  if (type) return res.status(404).json({ message });
  res.status(200).json(message);
};

const insertNewProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productService.insert(name);
  
  if (type === 'INVALID_VALUE') return res.status(400).json({ message });

  if (type === 'UNPROCESSABLE_VALUE') return res.status(422).json({ message });

  if (type) return res.status(404).json({ message });

  res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { type, message } = await productService.update(+id, name);
  if (type === 'INVALID_VALUE') return res.status(400).json({ message });

  if (type === 'UNPROCESSABLE_VALUE') { return res.status(422).json({ message }); }
  
  if (type) return res.status(404).json({ message });
  
  res.status(200).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.deleteRow(+id);
  if (type) return res.status(404).json({ message });
  return res.sendStatus(204);
}; 

const searchProductQuery = async (req, res) => {
  const { q } = req.query;
  const { message } = await productService.searchByQuery(q);
  return res.status(200).json(message);
};

  module.exports = {
  findAllProducts,
  findById,
  insertNewProduct,
  updateProduct,
  deleteProduct,
  searchProductQuery,
};