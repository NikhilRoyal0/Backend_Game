const express = require("express");
const route = express.Router();
const responseManager = require("../../utils/responseManager");
const bankAccountService = require("../../services/accounts/bankAccount_services");
const {bankSchema} = require("../../models/accounts/bank_schema");



route.get("/getAllBankAccounts", async (req, res) => {
  const data = await bankAccountService.getAllBankAccounts();
  responseManager.sendSuccess(res, data);
  return;
});

route.get("/getAccountByUserId/:user_id", async (req, res) => {
    const { user_id } = req.params;
    try {
      const data = await bankAccountService.getBankByUserId(user_id);
      responseManager.sendSuccess(res, data);
    } catch (error) {
      responseManager.sendError(res, error.message);
    }
  });

route.post("/addBankAccount", async (req, res) => {
    const data = req.body;

    const { error } = bankSchema.validate(data);
    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(', ');
        return res.status(400).send(errorMessage);
    }

    bankAccountService.addBankAccount(data)
        .then(newBankAccount => responseManager.sendSuccess(res, newBankAccount))
        .catch(error => responseManager.sendError(res, error.message));
});


route.put("/updateBankAccount/:bank_id", (req, res) => {
    const bank_id = req.params.bank_id;
    const data = req.body;

    const { error } = bankSchema.validate(data);
    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(', ');
        return res.status(400).send(errorMessage);
    }

    bankAccountService.updateBankAccount(bank_id, data)
        .then(updatedBankAccount => {
            responseManager.sendSuccess(res, updatedBankAccount);
        })
        .catch(error => {
            responseManager.sendError(res, error.message);
        });
});



route.delete("/deleteBankAccount/:bank_id", (req, res) => {
    const id = req.params.bank_id;

    bankAccountService.deleteBankAccount(id)
        .then(deletedBankAccount => responseManager.sendSuccess(res, deletedBankAccount))
        .catch(error => responseManager.sendError(res, error.message));
});


module.exports = route;
