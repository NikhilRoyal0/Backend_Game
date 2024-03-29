const Joi = require("joi");

const categorySchema = Joi.object({
  category_title: Joi.string().required(),
  category_info: Joi.string().required(),
  category_image: Joi.any(), // Adjusted to accept any type of file upload
  category_type: Joi.string().required(),
});

module.exports = {
  categorySchema,
};
