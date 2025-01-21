const jwt = require("jsonwebtoken");
const config = require("../../config");
const mongodb = require("mongoose");
const User = require("../models/UserModel");
const app = require("express")

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const verified = jwt.verify(token, config.tokenKey);

      User.findById({ _id: verified._id })
        .then((user) => {
          res.locals.userId = user._id;
          res.locals.userName = user.username;
        })
        .catch((err) => {
          console.log(err);
        });

      next();
    } catch {
      res.status(400).json({
        message: "Verification failure.",
        err: "verFail",
      });
    }
  } else {
    res.status(400).json({
      message: "No user is logged in.",
      err: "noLogged",
    });
  }
};
