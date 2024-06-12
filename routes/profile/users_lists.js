const express = require("express");
const route = express.Router();
const responseManager = require("../../utils/responseManager");
const usersService = require("../../services/profile/users_services");
const {userSchema} = require("../../models/profile/users_schema");



route.get("/getAllUsers", async (req, res) => {
  const data = await usersService.getAllUsers();
  responseManager.sendSuccess(res, data);
  return;
});

route.post("/addUser", async (req, res) => {
    const data = req.body;

    // Validate request body against gameAppSettingsSchema
    const { error } = userSchema.validate(data);
    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(', ');
        return res.status(400).send(errorMessage);
    }

    usersService.addUser(data)
        .then(newSetting => responseManager.sendSuccess(res, newSetting))
        .catch(error => responseManager.sendError(res, error.message));

        return
});


route.put("/updateUser/:setting_id", (req, res) => {
    const setting_id = req.params.setting_id;
    const data = req.body;

    // Validate request body against gameAppSettingsSchema
    const { error } = userSchema.validate(data);
    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(', ');
        return res.status(400).send(errorMessage);
    }

    usersService.updateUser(setting_id, data)
        .then(updatedSetting => {
            responseManager.sendSuccess(res, updatedSetting);
        })
        .catch(error => {
            responseManager.sendError(res, error.message);
        });

        return
});



route.delete("/deleteUser/:user_id", (req, res) => {
    const id = req.params.user_id;

    usersService.deleteUser(id)
        .then(deletedUser => responseManager.sendSuccess(res, deletedUser))
        .catch(error => responseManager.sendError(res, error.message));

        return
});


module.exports = route;
