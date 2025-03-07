const Action = require("../models/ActionModel");
const Customer = require("../models/CustomerModel");
const User = require("../models/UserModel");
const app = require("express");
const mongoose = require("mongoose")

module.exports = {
  index: (req, res) => {
    Action.find(req.params.id ? { customerRef: req.params.id } : {})
      .populate("creator")
      .exec()
      .then((actions) => {
        res.status(200).json(actions);
      })
      .catch((err) => {
        res.status(400).json({
          message: "Error while fetching actions data.",
        });
      });
  },

  find: (req, res) => {
    Action.find({ _id: req.params.id })
      .then((actions) => {
        res.status(200).json(actions);
      })
      .catch((err) => {
        res.status(400).json({
          message: "Error while searching for action.",
        });
      });
  },

  create: (req, res) => {
    const newAction = new Action({
      ...req.body,
      customerRef: req.params.customerId,
      creator: res.locals.userId,
    });

    newAction
      .save()
      .then(() => {
        res.status(200).json({
          message: "new action created",
        });

        Customer.updateOne(
          { _id: req.params.customerId },
          { $push: { actions: newAction._id } }
        )
          .then(() => {
            // console.log("updated");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  delete: (req, res) => {
    let actionId = req.params.id;

    Action.findByIdAndDelete(actionId)
      .then(() => {
        Customer.updateOne(
          { actions: actionId },
          { $pull: { actions: actionId } }
        ).catch((err) => {
          console.log(err);
        });

        res.status(200).json({
          message: "Action deleted successfully.",
        });
      })
      .catch((err) => {
        res.status(400).json({
          message: "Error while deleting action",
          error: err,
        });
      });
  },

  edit: (req, res) => {
    let actionId = req.params.id;

    Action.findByIdAndUpdate(actionId, req.body)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(400).json({
          error: err,
        });
      });
  },
};
