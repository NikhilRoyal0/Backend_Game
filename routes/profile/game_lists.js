const express = require("express");
const route = express.Router();
const responseManager = require("../../utils/responseManager");
const gameListService = require("../../services/profile/lists_services");
const { gamelistSchema } = require("../../models/profile/lists_schema");
const multer = require("multer");
const fileUploaderController = require("../../controller/imageUploader/cloudinary");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

route.get("/getGameList", async (req, res) => {
  try {
    const data = await gameListService.getGameList();
    responseManager.sendSuccess(res, data);
  } catch (error) {
    responseManager.sendError(res, error.message);
  }
});

route.post("/addGameList", upload.single("game_thumbnail"), (req, res) => {
  const fileBuffer = req.file.buffer;
  const formData = req.body;

  const { error } = gamelistSchema.validate(formData);
  if (error) {
    return res
      .status(400)
      .send(error.details.map((detail) => detail.message).join(", "));
  }

  fileUploaderController
    .uploadMedia(fileBuffer)
    .then((imageUrl) => {
      const newGameList = { ...formData, game_thumbnail: imageUrl };
      return gameListService.addGameList(newGameList);
    })
    .then((newGame) => responseManager.sendSuccess(res, newGame))
    .catch((error) => responseManager.sendError(res, error.message));
});

route.put("/updateGameList/:game_id", async (req, res) => {
  try {
    const game_id = req.params.game_id;
    const data = req.body;

    const { error } = gamelistSchema.validate(data);
    if (error) {
      return res
        .status(400)
        .send(error.details.map((detail) => detail.message).join(", "));
    }

    const updatedGameList = await gameListService.updateGameList(game_id, data);
    responseManager.sendSuccess(res, updatedGameList);
  } catch (error) {
    responseManager.sendError(res, error.message);
  }
});

route.delete("/deleteGameList/:game_id", async (req, res) => {
  try {
    const id = req.params.game_id;
    const deletedGameList = await gameListService.deleteGameList(id);
    responseManager.sendSuccess(res, deletedGameList);
  } catch (error) {
    responseManager.sendError(res, error.message);
  }
});

module.exports = route;
