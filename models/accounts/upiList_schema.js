const Joi = require("joi");

const upiSchema = Joi.object({
    upi_hash: Joi.string().required(),
    upi_code: Joi.string().required(),
    upi_title: Joi.string().required(),
    status: Joi.string().valid('active', 'inactive', 'pending').required(),
    created_on: Joi.date().required(), 
    updated_on: Joi.date().required()
});

module.exports = {
    upiSchema
};
