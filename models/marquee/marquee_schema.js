const Joi = require("joi");


const gameMarqueeSchema = Joi.object({
    title: Joi.string().required(),

  });

  module.exports = {
    gameMarqueeSchema
  };