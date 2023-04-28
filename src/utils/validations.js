const schemas = require('./schemas');

const validateName = async (name) => {
  const { error, value } = await schemas.nameSchema.validate({ name });
  if (!value.name) {
    return { type: 'INVALID_VALUE', message: '"name" is required' };
  }
  if (error) {
    return {
      type: 'UNPROCESSABLE_VALUE',
      message: '"name" length must be at least 5 characters long',
    };
  }
  return { type: null, message: '' };
};

const vavlidateProductName = async (name) => {
  const { error } = await schemas.nameRequired.validate({ name });
  if (error) {
    return { type: 'INVALID_VALUE', message: '"name" is required' };
  }
};

const validateProduct = async (sale) => {
  const id = await sale.every((e) => e.productId);
  if (!id) {
    return { type: 'INVALID_ID', message: '"productId" is required' };
  }
  const quant = await sale.every((e) => e.quantity !== undefined);
  
  if (!quant) {
    return { type: 'INVALID_QTY', message: '"quantity" is required' };
  }

  const qtyLength = await sale.some(({ quantity }) => quantity > 0);

  if (!qtyLength) {
    return { type: 'INVALID_LENGTH', message: '"quantity" must be greater than or equal to 1' };
  }

  return { type: null, message: '' };
};

module.exports = {
  validateName,
  vavlidateProductName,
  validateProduct,
};
