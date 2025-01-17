const config = require("./config");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const CustomerRouter = require("./app/routers/CustomerRouter");
const ActionRouter = require("./app/routers/ActionRouter");
const UserRouter = require("./app/routers/UserRouter");
const app = express();

// Mongodb
mongoose
  .connect(`mongodb://${config.db.url}:${config.db.port}/${config.db.name}`)
  .then(() => {
    console.log("mongodb operational");
  })
  .catch((err) => {
    console.log(err);
  });

// Middlewares
app.use(express.json());
app.use(cors());

// Routers
app.use("/customer", CustomerRouter);
app.use("/action", ActionRouter);
app.use("/user", UserRouter);

app.listen(config.app.port, () => {
  console.log("express server operational");
});
