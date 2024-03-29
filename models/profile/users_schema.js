const Joi = require("joi");

const userSchema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    phone_number: Joi.string().pattern(/^\d{10}$/).required(), 
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    status: Joi.string().valid('active', 'inactive', 'pending').required(),
    created_on: Joi.date().timestamp().required(),
    updated_on: Joi.date().timestamp().required(),
    wallet_amount: Joi.number().min(0).required(), 
    parent_id: Joi.number().integer().min(1).allow(null) 
});

module.exports = {
    userSchema
};
