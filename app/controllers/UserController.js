const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

module.exports = {
  create: (req, res) => {
    console.log(req.header);
    const newUser = new User(req.body);

    newUser
      .save()
      .then(() => {
        res.status(200).json({
          message: "user saved successfully.",
        });
      })
      .catch((err) => {
        res.status(400).json({
          message: "error while creating new user",
          err: err,
        });
      });
  },

  login: (req, res) => {
    User.findOne({ username: req.body.username })
      .then((user) => {
        if (user) {
          bcrypt.compare(
            req.body.password || "",
            user.password,
            (err, result) => {
              if (
                (err) => {
                  res.status(400).json(err);
                  return;
                }
              )
                if (result) {
                  const token = user.generateAuthToken(user);
                  res.status(200).json({
                    message: "Password is ok.",
                    result: result,
                    token: token,
                  });
                  return;
                } else {
                  res.status(400).json({
                    message: "Wrong password.",
                    err: "wrongPassword",
                  });
                  return;
                }
            }
          );
        } else {
            res.status(404).json({
                message: "User not found.",
                err: "noUser"
            })
        }
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
