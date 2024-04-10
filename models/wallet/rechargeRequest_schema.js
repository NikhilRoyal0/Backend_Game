const Joi = require("joi");

const rechargeRequest_schema = Joi.object({
  user_id: Joi.number().integer().min(1).required(),
  upi_id: Joi.number().integer().min(1).required(),
  amount: Joi.number().min(0).required(),
  remarks: Joi.string().allow("").optional(),
  status: Joi.string().valid("pending", "completed", "failed").required(),
  created_on: Joi.date().required(),
});

module.exports = {
  rechargeRequest_schema,
};
