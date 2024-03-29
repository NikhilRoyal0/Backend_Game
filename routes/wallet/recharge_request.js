const express = require("express");
const route = express.Router();
const responseManager = require("../../utils/responseManager");
const rechargeRequestService = require("../../services/wallet/rechargeRequest_services");
const {rechargeRequest_schema} = require("../../models/wallet/rechargeRequest_schema");



route.get("/getAllRechargeRequest", async (req, res) => {
  const data = await rechargeRequestService.getAllRechargeRequest();
  responseManager.sendSuccess(res, data);
  return;
});

route.post("/newRechargeRequest", async (req, res) => {
    const data = req.body;

    const { error } = rechargeRequest_schema.validate(data);
    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(', ');
        return res.status(400).send(errorMessage);
    }

    rechargeRequestService.newRechargeRequest(data)
        .then(newRechargeRequest => responseManager.sendSuccess(res, newRechargeRequest))
        .catch(error => responseManager.sendError(res, error.message));
});


route.put("/updateRechargeRequest/:recharge_id", (req, res) => {
    const recharge_id = req.params.recharge_id;
    const data = req.body;

    const { error } = rechargeRequest_schema.validate(data);
    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(', ');
        return res.status(400).send(errorMessage);
    }

    rechargeRequestService.updateRechargeRequest(recharge_id, data)
        .then(updateRechargeRequest => {
            responseManager.sendSuccess(res, updateRechargeRequest);
        })
        .catch(error => {
            responseManager.sendError(res, error.message);
        });
});



route.delete("/deleteRechargeRequest/:recharge_id", (req, res) => {
    const id = req.params.recharge_id;

    rechargeRequestService.deleteRechargeRequest(id)
        .then(deletedRechargeRequest => responseManager.sendSuccess(res, deletedRechargeRequest))
        .catch(error => responseManager.sendError(res, error.message));
});


module.exports = route;
