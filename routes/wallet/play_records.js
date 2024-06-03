const express = require("express");
const route = express.Router();
const responseManager = require("../../utils/responseManager");
const playRecordService = require("../../services/wallet/playRecords_services");
const {playRecordSchema} = require("../../models/wallet/playRecords_schema");



route.get("/getAllPlayRecords", async (req, res) => {
  const data = await playRecordService.getAllPlayRecords();
  responseManager.sendSuccess(res, data);
  return;
});

route.get("/getRecordByUser/:user_id", async (req, res) => {
    const { user_id } = req.params;
    try {
      const data = await playRecordService.getPlayRecordsByUserId(user_id);
      responseManager.sendSuccess(res, data);
    } catch (error) {
      responseManager.sendError(res, error.message);
    }
  });

route.post("/newPlayRecord", async (req, res) => {
    const data = req.body;

    const { error } = playRecordSchema.validate(data);
    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(', ');
        return res.status(400).send(errorMessage);
    }

    playRecordService.newPlayRecord(data)
        .then(newPlayRecord => responseManager.sendSuccess(res, newPlayRecord))
        .catch(error => responseManager.sendError(res, error.message));
});


route.put("/updatePlayRecord/:play_record_id", (req, res) => {
    const play_record_id = req.params.play_record_id;
    const data = req.body;

    const { error } = playRecordSchema.validate(data);
    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(', ');
        return res.status(400).send(errorMessage);
    }

    playRecordService.updatePlayRecord(play_record_id, data)
        .then(updatedPlayRecord => {
            responseManager.sendSuccess(res, updatedPlayRecord);
        })
        .catch(error => {
            responseManager.sendError(res, error.message);
        });
});



route.delete("/deletePlayRecord/:play_record_id", (req, res) => {
    const id = req.params.play_record_id;

    playRecordService.deletePlayRecord(id)
        .then(deletedPlayRecord => responseManager.sendSuccess(res, deletedPlayRecord))
        .catch(error => responseManager.sendError(res, error.message));
});


module.exports = route;
