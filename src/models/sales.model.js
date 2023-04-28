const camelize = require('camelize');
const conn = require('./connections');

const findAll = async () => {
  const [result] = await conn.execute(
    `SELECT * FROM StoreManager.sales AS sl
    JOIN StoreManager.sales_products AS sp
    ON sp.sale_id = sl.id`,
  );
  return camelize(result);
};

const findById = async (id) => {
  const [result] = await conn.execute(
    `SELECT * FROM StoreManager.sales AS sl
    JOIN StoreManager.sales_products AS sp
    ON sp.sale_id = sl.id
    WHERE id = ?;`,
    [id],
  );
  return camelize(result);
};

const insertProduct = async (id, sale) => {
  const result = await conn.execute(
    `
    INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);`,
    [id, sale.productId, sale.quantity],
  );
  return result;
};

const insertSale = async () => {
  const [{ insertId }] = await conn.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );
  return insertId;
};

module.exports = {
  findAll,
  findById,
  insertProduct,
  insertSale,
};