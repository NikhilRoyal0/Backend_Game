const Joi = require("joi");

const upiSchema = Joi.object({
    upi_hash: Joi.string().required(),
    upi_code: Joi.string().required(),
    upi_title: Joi.string().required(),
    status: Joi.string().valid('active', 'inactive', 'pending').required(),
    created_on: Joi.date().timestamp().required(), 
    updated_on: Joi.date().timestamp().required()
});

module.exports = {
    upiSchema
};
