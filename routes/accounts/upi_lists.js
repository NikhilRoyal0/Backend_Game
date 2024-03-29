const express = require("express");
const route = express.Router();
const responseManager = require("../../utils/responseManager");
const upiService = require("../../services/accounts/upiList_services");
const { upiSchema } = require("../../models/accounts/upiList_schema");

route.get("/getAllUpiList", async (req, res) => {
  const data = await upiService.getAllUpiList();
  responseManager.sendSuccess(res, data);
  return;
});

route.post("/addUpi", async (req, res) => {
  const data = req.body;

  const { error } = upiSchema.validate(data);
  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    return res.status(400).send(errorMessage);
  }

  upiService
    .addUpi(data)
    .then((newUpi) => responseManager.sendSuccess(res, newUpi))
    .catch((error) => responseManager.sendError(res, error.message));
});

route.put("/updateUpi/:upi_id", (req, res) => {
  const upi_id = req.params.upi_id;
  const data = req.body;

  const { error } = upiSchema.validate(data);
  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    return res.status(400).send(errorMessage);
  }

  upiService
    .updateUpi(upi_id, data)
    .then((updatedUpi) => {
      responseManager.sendSuccess(res, updatedUpi);
    })
    .catch((error) => {
      responseManager.sendError(res, error.message);
    });
});

route.delete("/deleteUpi/:upi_id", (req, res) => {
  const id = req.params.upi_id;

  upiService
    .deleteUpi(id)
    .then((deletedUpi) => responseManager.sendSuccess(res, deletedUpi))
    .catch((error) => responseManager.sendError(res, error.message));
});

module.exports = route;
