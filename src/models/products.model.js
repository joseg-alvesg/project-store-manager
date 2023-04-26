const conn = require('./connections');

const findAll = async () => {
  const [result] = await conn.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

module.exports = {
  findAll,
};