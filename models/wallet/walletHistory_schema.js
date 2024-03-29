const Joi = require("joi");

const walletHistory_schema = Joi.object({
  transaction_id: Joi.number().integer().min(1).required(),
  user_id: Joi.number().integer().min(1).required(),
  amount: Joi.number().min(0).required(),
  previous_amount: Joi.number().min(0).required(),
  remarks: Joi.string().allow("").optional(),
  created_on: Joi.date().timestamp().required(),
});

module.exports = {
  walletHistory_schema,
};
