const conn = require('./connections');

const findAll = async () => {
  const [result] = await conn.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

const findById = async (id) => {
  const [[result]] = await conn.execute(
    'SELECT * FROM StoreManager.products WHERE id =  ?',
    [id],
  );
  return result;
};

const insert = async (product) => {
  const [{ insertId }] = await conn.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [product],
  );
  return insertId;
};

const update = async (id, product) => {
  const [{ affectedRows }] = await conn.execute(
    `UPDATE StoreManager.products 
    SET name = ?
    WHERE id =  ?`,
    [product, id],
  );
  return affectedRows;
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
};
