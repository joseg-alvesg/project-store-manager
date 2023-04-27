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

module.exports = {
  validateName,
};
