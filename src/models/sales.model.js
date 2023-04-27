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

module.exports = {
  findAll,
};