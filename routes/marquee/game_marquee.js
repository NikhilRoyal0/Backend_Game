const express = require("express");
const route = express.Router();
const responseManager = require("../../utils/responseManager");
const marqueeService = require("../../services/marquee/marquee_services");
const { gameMarqueeSchema } = require("../../models/marquee/marquee_schema");

route.get("/getMarquee", async (req, res) => {
  const data = await marqueeService.getAllMarquee();
  responseManager.sendSuccess(res, data);
  return;
});

route.post("/insertMarquee", async (req, res) => {
  const data = req.body;

  const { error } = gameMarqueeSchema.validate(data);
  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    return res.status(400).send(errorMessage);
  }

  marqueeService
    .insertMarquee(data)
    .then((newMarquee) => responseManager.sendSuccess(res, newMarquee))
    .catch((error) => responseManager.sendError(res, error.message));
});

route.put("/updateMarquee/:marquee_id", (req, res) => {
  const marquee_id = req.params.marquee_id;
  const data = req.body;

  const { error } = gameMarqueeSchema.validate(data);
  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    return res.status(400).send(errorMessage);
  }

  marqueeService
    .updateMarquee(marquee_id, data)
    .then((updatedMarquee) => {
      responseManager.sendSuccess(res, updatedMarquee);
    })
    .catch((error) => {
      responseManager.sendError(res, error.message);
    });
});

route.delete("/deleteMarquee/:marquee_id", (req, res) => {
  const id = req.params.marquee_id;

  marqueeService
    .deleteMarquee(id)
    .then((deletedMarquee) => responseManager.sendSuccess(res, deletedMarquee))
    .catch((error) => responseManager.sendError(res, error.message));
});

module.exports = route;
