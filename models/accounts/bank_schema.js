const Joi = require("joi");

const bankSchema = Joi.object({
  bank_name: Joi.string().required(),
  bank_ifsc: Joi.string().required(),
  bank_number: Joi.string().required(),
  bank_holder_name: Joi.string().required(),
  bank_status: Joi.string().valid("active", "inactive", "pending").required(),
  user_id: Joi.number().integer().required(), 
});

module.exports = {
  bankSchema,
};
