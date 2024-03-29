const express = require("express");
const route = express.Router();
const responseManager = require("../../utils/responseManager");
const referService = require("../../services/refer/refer_services");
const {referSchema} = require("../../models/refer/refer_schema");



route.get("/getAllRefers", async (req, res) => {
  const data = await referService.getAllRefers();
  responseManager.sendSuccess(res, data);
  return;
});

route.post("/newRefer", async (req, res) => {
    const data = req.body;

    const { error } = referSchema.validate(data);
    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(', ');
        return res.status(400).send(errorMessage);
    }

    referService.newRefer(data)
        .then(newRefer => responseManager.sendSuccess(res, newRefer))
        .catch(error => responseManager.sendError(res, error.message));
});


route.put("/updateRefer/:team_id", (req, res) => {
    const team_id = req.params.team_id;
    const data = req.body;

    const { error } = referSchema.validate(data);
    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(', ');
        return res.status(400).send(errorMessage);
    }

    referService.updateRefer(team_id, data)
        .then(updatedRefer => {
            responseManager.sendSuccess(res, updatedRefer);
        })
        .catch(error => {
            responseManager.sendError(res, error.message);
        });
});



route.delete("/deleteRefer/:team_id", (req, res) => {
    const id = req.params.team_id;

    referService.deleteRefer(id)
        .then(deletedRefer => responseManager.sendSuccess(res, deletedRefer))
        .catch(error => responseManager.sendError(res, error.message));
});


module.exports = route;
