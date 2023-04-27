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
  const { error, value } = await schemas.nameRequired.validate({ name });
  if (error) {
    return { type: 'INVALID_VALUE', message: '"name" is required' };
  }
};

module.exports = {
  validateName,
  vavlidateProductName,
};
