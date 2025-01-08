const config = require("./config");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const customerRouter = require("./app/routers/CustomerRouter")();

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
const app = express();
app.use(express.json());
app.use(cors());

// Routers
app.use("/customer", customerRouter);

app.listen(config.app.port, () => {
  console.log("express server operational");
});
