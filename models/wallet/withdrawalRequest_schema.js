const Joi = require("joi");

const withdrawalRequest_schema = Joi.object({
  user_id: Joi.number().integer().min(1).required(),
  amount: Joi.number().min(0).required(),
  bank_id: Joi.number().integer().min(1).required(),
  status: Joi.string().valid("pending", "completed", "failed").required(),
  created_on: Joi.date().default(Date.now).required()
});

module.exports = {
  withdrawalRequest_schema,
};
