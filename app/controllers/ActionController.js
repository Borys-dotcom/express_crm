const Action = require("../models/ActionModel");
const Customer = require("../models/CustomerModel");

module.exports = {
  index: (req, res) => {
    Action.find(req.params.id ? { customerRef: req.params.id } : {})
      .then((actions) => {
        res.status(200).json(actions);
      })
      .catch((err) => {
        res.status(400).json({
          message: "Error while fetching actions data.",
        });
      });
  },

  create: (req, res) => {
    const newAction = new Action({
      type: req.body.type,
      description: req.body.description,
      date: req.body.date,
      customerRef: req.params.id,
    });

    newAction
      .save()
      .then(() => {
        res.status(200).json({
          message: "new action created",
        });

        Customer.updateOne(
          { _id: req.params.id },
          { $push: { actions: newAction._id } }
        )
          .then(() => {
            console.log("updated");
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
        )
          .catch((err) => {
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
};
