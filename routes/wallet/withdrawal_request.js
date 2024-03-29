const express = require("express");
const route = express.Router();
const responseManager = require("../../utils/responseManager");
const withdrawService = require("../../services/wallet/withdrawalRequest_services");
const {
  withdrawalRequest_schema,
} = require("../../models/wallet/withdrawalRequest_schema");

route.get("/getAllWithdrawRequest", async (req, res) => {
  const data = await withdrawService.getAllWithdrawRequest();
  responseManager.sendSuccess(res, data);
  return;
});

route.post("/newWithdrawRequest", async (req, res) => {
  const data = req.body;

  const { error } = withdrawalRequest_schema.validate(data);
  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    return res.status(400).send(errorMessage);
  }

  withdrawService
    .newWithdrawRequest(data)
    .then((newWithdrawRequest) =>
      responseManager.sendSuccess(res, newWithdrawRequest)
    )
    .catch((error) => responseManager.sendError(res, error.message));
});

route.put("/updateWithdrawRequest/:withdrawal_id", (req, res) => {
  const withdrawal_id = req.params.withdrawal_id;
  const data = req.body;

  const { error } = withdrawalRequest_schema.validate(data);
  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    return res.status(400).send(errorMessage);
  }

  withdrawService
    .updateWithdrawRequest(withdrawal_id, data)
    .then((updatedWithdrawRequest) => {
      responseManager.sendSuccess(res, updatedWithdrawRequest);
    })
    .catch((error) => {
      responseManager.sendError(res, error.message);
    });
});

route.delete("/deleteWithdrawRequest/:withdrawal_id", (req, res) => {
  const id = req.params.withdrawal_id;

  withdrawService
    .deleteWithdrawRequest(id)
    .then((deletedWithdrawRequest) =>
      responseManager.sendSuccess(res, deletedWithdrawRequest)
    )
    .catch((error) => responseManager.sendError(res, error.message));
});

module.exports = route;
