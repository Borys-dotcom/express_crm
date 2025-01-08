const config = require("./config");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("router");

mongoose
  .connect(`mongodb://${config.db.url}:${config.db.port}/${config.db.name}`)
  .then(() => {
    console.log("mongodb operational");
  });

const app = express();

app.use(express.json());

app.listen(config.app.port, () => {
  console.log("express server operational");
});
