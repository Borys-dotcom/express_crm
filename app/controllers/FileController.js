const express = require("express");
const multer = require("multer");
const fs = require("fs");
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

    filesArray.forEach((file, index) => {
      let newFile = new File({
        name: file.originalname,
        path: file.path,
        date: new Date(),
        note: req.body.note,
        customerRef: req.body.customer,
        creator: res.locals.userId,
      });

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

  delete: async (req, res) => {
    File.findByIdAndDelete(req.params.fileId)
      .then((response) => {
        //===========================================================
        //dodać wyrzucanie plików z dysku - filesystem
        //===========================================================
        Customer.updateOne(
          { _id: req.params.customerId },
          { $pull: { files: req.params.fileId } }
        )
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          });

        fs.unlink(response.path, (err) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log("file deleted successfully");
        });

        res.status(200).json({ msg: "file deleted successfully" });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ msg: "error while deleting file", err: err });
      });
  },

  download: (req, res) => {
    console.log("wysyłam do pobrania");

    File.findById(req.params.id)
      .then((file) => {
        console.log(file.name);
        res.status(200).download(file.path, file.name);
      })
      .catch((err) => console.log(err));
  },
};
