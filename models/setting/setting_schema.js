const Joi = require("joi");


const gameAppSettingsSchema = Joi.object({
    about_us: Joi.string().required(),
    contact_us: Joi.string().required(),
    floating_link: Joi.string().required(),
    terms_and_conditions: Joi.string().required(),
    agreement_text: Joi.string().required(),
    updated_on: Joi.date().timestamp().required()
  });

  module.exports = {
    gameAppSettingsSchema
  };