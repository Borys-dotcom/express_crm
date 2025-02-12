const Customer = require("../models/CustomerModel");

module.exports = {
  index: (req, res) => {
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

  indexPagination: (req, res) => {
    const page = req.params.page;
    const limit = req.params.limit;
    const skip = (page - 1) * limit;

    Customer.find({})
      .limit(limit)
      .skip(skip)
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

  count: (req, res) => {
    Customer.countDocuments()
      .then((customersNumber) => {
        res.status(201).json(customersNumber);
      })
      .catch((err) => {
        res.status(400).json({
          message: "Error while counting customers",
          error: err,
        });
      });
  },

  add: (req, res) => {
    const newCustomer = new Customer({
      name: req.body.name,
      address: req.body.address,
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

  update: (req, res) => {
    const updatedCustomer = {
      name: req.body.name,
      address: req.body.address,
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

  find: (req, res) => {
    Customer.findById(req.params.id)
      .populate("actions")
      .populate("files")
      .lean()
      .then((customer) => {
        if (!customer) {
          res.status(400).json({
            message: "No customer found",
            customerId: req.params.id,
          });
        } else {
          res.status(200).json(customer);
        }
      })
      .catch((err) => {
        res.status(400).json({
          message: "Error while searching for customer",
          error: err,
        });
      });
  },

  delete: (req, res) => {
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
