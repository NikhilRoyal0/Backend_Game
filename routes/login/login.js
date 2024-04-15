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
            ResponseManager.sendSuccess(
              res,
              { token },
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
  }  catch (error) {
    console.error("Server error:", error);
    // Check if the error message indicates the user ID was not found
    if (error.message.includes("undefined")) {
      ResponseManager.sendError(
        res,
        404,
        "USER_NOT_FOUND",
        "User not found"
      );
    } else {
      ResponseManager.sendError(
        res,
        500,
        "SERVER_ERROR",
        "Internal server error"
      );
    }
  }
});

route.post("/profile", verifyToken, async (req, res) => {
  jwt.verify(req.token, secret_key, async (err, decoded) => {
    if (err) {
      console.error("Invalid token:", err);
      ResponseManager.sendError(res, 401, "INVALID_TOKEN", "Invalid token");
    } else {
      try {
        const userData = await LoginService.getUserById(decoded.userData.id);
        if (userData) {
          ResponseManager.sendSuccess(
            res,
            userData,
            200,
            "Profile retrieved successfully"
          );
        } else {
          // Check if the error indicates the user was not found
          ResponseManager.sendError(
            res,
            404,
            "USER_NOT_FOUND",
            "User not found"
          );
        }
      } catch (error) {
        console.error("Server error:", error);
        // Check if the error message indicates the user ID was not found
        if (error.message.includes("undefined")) {
          ResponseManager.sendError(
            res,
            404,
            "USER_NOT_FOUND",
            "User not found"
          );
        } else {
          ResponseManager.sendError(
            res,
            500,
            "SERVER_ERROR",
            "Internal server error"
          );
        }
      }
    }
  });
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
