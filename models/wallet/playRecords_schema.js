const Joi = require("joi");

const playRecords_schema = Joi.object({
  game_id: Joi.number().integer().min(1).required(),
  user_id: Joi.number().integer().min(1).required(),
  amount: Joi.number().min(0).required(),
  bid_choice: Joi.string().valid("choice1", "choice2", "choice3").required(),
  status: Joi.string().valid("pending", "completed", "failed").required(),
  created_on: Joi.date().timestamp().required(),
});

module.exports = {
  playRecords_schema,
};
