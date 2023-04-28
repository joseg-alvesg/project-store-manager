const Joi = require('joi');

const nameSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

const nameRequired = Joi.object({
  name: Joi.required(),
});

// dificulty

module.exports = {
  nameSchema,
  nameRequired,
};