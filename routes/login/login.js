const express = require("express");
const route = express.Router();
const jwt = require("jsonwebtoken");
const ResponseManager = require("../../utils/responseManager");
const LoginService = require("../../services/login/loginService");

const secret_key = "12";

route.post("/login", async (req, res) => {
  const { Email, Password } = req.body;
  try {
    const user = await LoginService.getUserByEmailAndPassword(Email, Password);
    if (user) {
      const userData = {
        id: user[0].AdminID,
        Email: user[0].Email,
        Password: user[0].Password,
        Phone: user[0].Phone,
        Age: user[0].Age,
        City: user[0].City,
        ProfilePicture: user[0].ProfilePicture,
      };
      jwt.sign(
        { userData },
        secret_key,
        { expiresIn: "1200s" },
        (err, token) => {
          if (err) {
            console.error("Error generating token:", err);
            ResponseManager.sendError(
              res,
              500,
              "ERR_GENERATING_TOKEN",
              "Error generating token"
            );
          } else {
            // Respond with user data and token
            ResponseManager.sendSuccess(
              res,
              { user: userData, token },
              200,
              "Login successful"
            );
          }
        }
      );
    } else {
      ResponseManager.sendError(
        res,
        401,
        "INVALID_CREDENTIALS",
        "Invalid email or password"
      );
    }
  } catch (error) {
    console.error("Server error:", error);
    ResponseManager.sendError(
      res,
      500,
      "SERVER_ERROR",
      "Internal server error"
    );
  }
});



function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    next();
  } else {
    ResponseManager.sendError(
      res,
      403,
      "MISSING_TOKEN",
      "Authorization header missing"
    );
  }
}

module.exports = route;
