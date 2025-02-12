const mongoose = require("mongoose");
const User = require("../models/UserModel");
const Customer = require("../models/CustomerModel");

const Action = new mongoose.Schema({
  type: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  customerRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Action", Action);
