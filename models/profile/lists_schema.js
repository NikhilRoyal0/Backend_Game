const Joi = require("joi");

const gamelistSchema = Joi.object({
    game_title: Joi.string().required(),
    game_thumbnail: Joi.any(),
    game_background_image: Joi.any(), 
    game_starting_price: Joi.number().min(0).required(),
    game_status: Joi.string().valid('active', 'inactive', 'pending').required(),
    game_duration_seconds: Joi.number().integer().min(0).required(),
    game_freeze_seconds: Joi.number().integer().min(0).required(),
    game_category_id: Joi.number().integer().min(1).required(),
    game_secondary_background_image: Joi.any(), 
    game_max_price: Joi.number().min(0).required(),
    game_not_played: Joi.number().required(),
});

module.exports = {
    gamelistSchema
};
