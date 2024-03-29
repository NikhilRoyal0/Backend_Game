const express = require("express");
const route = express.Router();
const responseManager = require("../../utils/responseManager");
const gameListService = require("../../services/profile/lists_services");
const {gamelistSchema} = require("../../models/profile/lists_schema");



route.get("/getGameList", async (req, res) => {
  const data = await gameListService.getGameList();
  responseManager.sendSuccess(res, data);
  return;
});

route.post("/addGameList", async (req, res) => {
    const data = req.body;

    const { error } = gamelistSchema.validate(data);
    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(', ');
        return res.status(400).send(errorMessage);
    }

    gameListService.addGameList(data)
        .then(newGame => responseManager.sendSuccess(res, newGame))
        .catch(error => responseManager.sendError(res, error.message));
});


route.put("/updateGameList/:game_id", (req, res) => {
    const game_id = req.params.game_id;
    const data = req.body;

    const { error } = gamelistSchema.validate(data);
    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(', ');
        return res.status(400).send(errorMessage);
    }

    gameListService.updateGameList(game_id, data)
        .then(updatedGameList => {
            responseManager.sendSuccess(res, updatedGameList);
        })
        .catch(error => {
            responseManager.sendError(res, error.message);
        });
});



route.delete("/deleteGameList/:game_id", (req, res) => {
    const id = req.params.game_id;

    gameListService.deleteGameList(id)
        .then(deletedGameList => responseManager.sendSuccess(res, deletedGameList))
        .catch(error => responseManager.sendError(res, error.message));
});


module.exports = route;
