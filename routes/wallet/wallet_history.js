const express = require("express");
const route = express.Router();
const responseManager = require("../../utils/responseManager");
const walletHistoryService = require("../../services/wallet/walletHistory_services");
const {
  walletHistory_schema,
} = require("../../models/wallet/walletHistory_schema");

route.get("/getWalletHistory", async (req, res) => {
  const data = await walletHistoryService.getWalletHistory();
  responseManager.sendSuccess(res, data);
  return;
});

route.get("/getHistoryByUserId/:user_id", async (req, res) => {
  const { user_id } = req.params;
  try {
    const data = await walletHistoryService.getWallethistoryByUserId(user_id);
    responseManager.sendSuccess(res, data);
  } catch (error) {
    responseManager.sendError(res, error.message);
  }
});

route.post("/newWalletHistory", async (req, res) => {
  const data = req.body;

  const { error } = walletHistory_schema.validate(data);
  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    return res.status(400).send(errorMessage);
  }

  walletHistoryService
    .newWalletHistory(data)
    .then((newWalletHistory) =>
      responseManager.sendSuccess(res, newWalletHistory)
    )
    .catch((error) => responseManager.sendError(res, error.message));
});

route.put("/updateWalletHistory/:wallet_id", (req, res) => {
  const wallet_id = req.params.wallet_id;
  const data = req.body;

  const { error } = walletHistory_schema.validate(data);
  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    return res.status(400).send(errorMessage);
  }

  walletHistoryService
    .updateWalletHistory(wallet_id, data)
    .then((updatedWalletHistory) => {
      responseManager.sendSuccess(res, updatedWalletHistory);
    })
    .catch((error) => {
      responseManager.sendError(res, error.message);
    });
});

route.delete("/deleteWalletHistory/:wallet_id", (req, res) => {
  const id = req.params.wallet_id;

  walletHistoryService
    .deleteWalletHistory(id)
    .then((deletedWalletHistory) =>
      responseManager.sendSuccess(res, deletedWalletHistory)
    )
    .catch((error) => responseManager.sendError(res, error.message));
});

module.exports = route;
