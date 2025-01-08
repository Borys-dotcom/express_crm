const { query } = require("express");
const Customer = require("../models/CustomerModel");

module.exports = {
  index: (req, res, next) => {
    Customer.find({})
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        return res.status(400).json({
          message: "Error while fetching customers data",
          error: err,
        });
      });
  },

  add: (req, res, next) => {
    const newCustomer = new Customer({
      name: req.body.name,
      address: {
        street: req.body.address.street,
        city: req.body.address.city,
        zipCode: req.body.address.zipCode,
      },
      taxNumber: req.body.taxNumber,
    });

    newCustomer
      .save()
      .then(() => {
        res.status(201).json({
          message: "Added new customer",
          customer: newCustomer,
        });
      })
      .catch((err) => {
        res.status(400).json({
          message: "Error while adding new customer",
          error: err,
        });
      });
  },

  update: (req, res, next) => {
    const updatedCustomer = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        city: req.body.address.city,
        zipCode: req.body.address.zipCode,
      },
      taxNumber: req.body.taxNumber,
    };

    Customer.findOneAndUpdate({ _id: req.params.id }, updatedCustomer)
      .then((result) => {
        if (!result) {
          res.status(400).json({
            message: "No customer found",
            customerId: req.params.id,
          });
        } else {
          res.status(201).json({
            message: "Customer updated",
            customerID: req.params.id,
            customerData: updatedCustomer,
          });
        }
      })
      .catch((err) => {
        res.status(400).json({
          message: "Error while updating customer",
          error: err,
        });
      });
  },

  find: (req, res, next) => {
    Customer.findById(req.params.id)
      .then((result) => {
        if (!result) {
          res.status(400).json({
            message: "No customer found",
            customerId: req.params.id,
          });
        } else {
          res.status(200).json({
            message: "Customer found",
            customer: result,
          });
        }
      })
      .catch((err) => {
        res.status(400).json({
          message: "Error while searching for customer",
          error: err,
        });
      });
  },

  delete: (req, res, next) => {
    Customer.findByIdAndDelete(req.params.id)
      .then((result) => {
        if (!result) {
          res.status(400).json({
            message: "No customer found",
            customerId: req.params.id,
          });
        } else {
          res.status(200).json({
            message: "Customer has been deleted",
            customerId: req.params.id,
          });
        }
      })
      .catch((err) => {
        res.status(400).json({
          message: "Error while deleting customer",
          error: err,
        });
      });
  },
};
