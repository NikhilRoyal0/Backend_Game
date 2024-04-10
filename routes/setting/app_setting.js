const express = require("express");
const route = express.Router();
const responseManager = require("../../utils/responseManager");
const appSettingService = require("../../services/setting/app_setting_services");
const {gameAppSettingsSchema} = require("../../models/setting/setting_schema");



route.get("/getSetting", async (req, res) => {
  const data = await appSettingService.getAllSetting();
  responseManager.sendSuccess(res, data);
  return;
});

route.post("/addSetting", async (req, res) => {
    const data = req.body;

    // Validate request body against gameAppSettingsSchema
    const { error } = gameAppSettingsSchema.validate(data);
    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(', ');
        return res.status(400).send(errorMessage);
    }

    appSettingService.insertSetting(data)
        .then(newSetting => responseManager.sendSuccess(res, newSetting))
        .catch(error => responseManager.sendError(res, error.message));
});


route.put("/updateSetting", (req, res) => {
    const data = req.body;

    // Validate request body against gameAppSettingsSchema
    const { error } = gameAppSettingsSchema.validate(data);
    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(', ');
        return res.status(400).send(errorMessage);
    }

    appSettingService.updateSetting(data)
        .then(updatedSetting => {
            responseManager.sendSuccess(res, updatedSetting);
        })
        .catch(error => {
            responseManager.sendError(res, error.message);
        });
});



// DELETE route to delete a setting by ID
route.delete("/deleteSetting/:setting_id", (req, res) => {
    const id = req.params.setting_id;

    appSettingService.deleteSetting(id)
        .then(deletedSetting => responseManager.sendSuccess(res, deletedSetting))
        .catch(error => responseManager.sendError(res, error.message));
});


module.exports = route;
