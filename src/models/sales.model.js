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
  console.log(result);
  return result;
};

const insertSale = async () => {
  const [{ insertId }] = await conn.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );
  return insertId;
};

const deleteRow = async (id) => {
  const [{ affectedRows }] = await conn.execute(
    `
    DELETE StoreManager.sales, StoreManager.sales_products
    FROM StoreManager.sales
    JOIN StoreManager.sales_products ON StoreManager.sales.id = StoreManager.sales_products.sale_id
    WHERE sales.id = ?;
    `,
    [id],
  );
  return affectedRows;
};

const update = async (id, sale) => {
  const [{ affectedRows }] = await conn.execute(
    `
    UPDATE StoreManager.sales_products
    JOIN StoreManager.sales ON StoreManager.sales.id = StoreManager.sales_products.sale_id
    SET StoreManager.sales_products.quantity = ?,
        StoreManager.sales.date = NOW()
    WHERE StoreManager.sales.id = ? AND StoreManager.sales_products.product_id = ?;
    `,
    [sale.quantity, id, sale.productId],
  );
  return affectedRows;
};

module.exports = {
  findAll,
  findById,
  insertProduct,
  insertSale,
  deleteRow,
  update,
};