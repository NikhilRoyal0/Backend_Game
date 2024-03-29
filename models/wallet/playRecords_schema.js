const Joi = require("joi");

const playRecordSchema = Joi.object({
  game_id: Joi.number().integer().min(1).required(),
  user_id: Joi.number().integer().min(1).required(),
  amount: Joi.number().required(),
  bid_choice: Joi.string().valid("choice1", "choice2", "choice3").required(),
  status: Joi.string().valid("pending", "completed", "failed").required(),
  created_on: Joi.date().required(),
});

module.exports = {
  playRecordSchema,
};
