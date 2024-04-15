const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require('cors');
require("express-async-errors");
const ResponseManager = require("./utils/responseManager");

app.use(express.json());
app.use(cors());


// Middleware to parse URL-encoded data in the request body
app.use(express.urlencoded({ extended: true }));

// Game Setting
app_setting_routes = require("./routes/setting/index");

// Game Profile
game_users = require("./routes/profile/index");
game_categories = require("./routes/profile/index");
game_list = require("./routes/profile/index");
login = require("./routes/login/login");
profile = require("./routes/login/login");

// Game Marquee
game_marquee = require("./routes/marquee/index");

//Game Refer

refer_team = require("./routes/refer/index");

// Game Bank Accounts

bank_accounts = require("./routes/accounts/index");
upi_list = require("./routes/accounts/index");

// Game Wallet History

recharge_request = require("./routes/wallet/index");
withdraw_request = require("./routes/wallet/index");
wallet_history = require("./routes/wallet/index");
play_records = require("./routes/wallet/index");

//* Middle ware Configuration

// Game Setting

app.use("/v1/setting/", app_setting_routes);

// Game Profile

app.use("/v1/profile/", game_users);
app.use("/v1/profile/", game_categories);
app.use("/v1/profile/", game_list);
app.use("/v1/",login);
app.use("/v1/",profile);

// Game Marquee

app.use("/v1/marquee/", game_marquee);

// Game Refer

app.use("/v1/refer/", refer_team);

// Game Bank Accounts

app.use("/v1/accounts/", bank_accounts);
app.use("/v1/accounts/", upi_list);

// Game Wallet History

app.use("/v1/wallet/", wallet_history);
app.use("/v1/wallet/", play_records);
app.use("/v1/wallet/", recharge_request);
app.use("/v1/wallet/", withdraw_request);


// Error Page

app.all("*", (req, res) => {
  ResponseManager.sendError(res, 404, "", "Yes", "Page Not Found");
});

//! End of Middle ware Configuration

//^ Global Error Handler
app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
  });
  next(err);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
