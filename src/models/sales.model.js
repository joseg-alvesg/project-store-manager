const conn = require('./connections');

const findAll = async () => {
  const result = conn.execute(
    `SELECT * FROM StoreManager.sales AS sl
    JOIN StoreManager.sales_products AS sp
    ON sp.sale_id = sl.id`,
  );
  return result;
};

module.exports = {
  findAll,
};