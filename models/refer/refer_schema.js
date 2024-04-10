const Joi = require("joi");

const referSchema = Joi.object({
    user_id: Joi.number().integer().min(1).required(), 
    my_id: Joi.number().integer().min(1).required(),
    status: Joi.string().valid('completed', 'failed', 'pending').required(),
    created_on: Joi.any().required() 
});

module.exports = {
    referSchema
};
