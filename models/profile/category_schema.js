const Joi = require("joi");

const categorySchema = Joi.object({
  category_title: Joi.string().required(),
  category_info: Joi.string().required(),
  category_image: Joi.any(), 
  category_type: Joi.string().required(),
});

module.exports = {
  categorySchema,
};
