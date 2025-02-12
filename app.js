const config = require("./config");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const CustomerRouter = require("./app/routers/CustomerRouter");
const ActionRouter = require("./app/routers/ActionRouter");
const UserRouter = require("./app/routers/UserRouter");
const LoginMiddleware = require("./app/middlewares/LoginMiddleware");
const FileRouter = require("./app/routers/FileRouter");
const app = express();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

//multer
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = "uploads/" + req.body.customer;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
    return cb(null, path);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routers
app.use("/customer", LoginMiddleware, CustomerRouter);
app.use("/action", LoginMiddleware, ActionRouter);
app.use("/files", [LoginMiddleware, upload.array("file")], FileRouter);
app.use("/user", UserRouter);

app.listen(config.app.port, () => {
  console.log("express server operational");
});
