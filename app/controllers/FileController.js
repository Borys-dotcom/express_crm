const express = require("express");
const multer = require("multer");
const File = require("../models/FileModel");
const Customer = require("../models/CustomerModel");

module.exports = {
  index: (req, res) => {
    File.find({ customerRef: req.params.id })
      .populate("creator")
      .exec()
      .then((files) => {
        res.status(200).json(files);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  upload: (req, res) => {
    let filesArray = req.files;
    let generalError = false;

    filesArray.forEach(async (file, index) => {
      console.log("zapisuję");
      let newFile = new File({
        name: file.originalname,
        path: file.path,
        date: new Date(),
        note: req.body.note,
        customerRef: req.body.customer,
        creator: res.locals.userId,
      });
      console.log(newFile);

      newFile
        .save()
        .then((res) => {
          Customer.updateOne(
            { _id: req.body.customer },
            { $push: { files: newFile._id } }
          )
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          generalError = true;
          console.log(err);
        });
    });

    if (!generalError) {
      res.status(200).json({ msg: "all files saved successfully" });
    } else {
      res.status(400).json({ msg: "error while saving files" });
    }
  },
};
