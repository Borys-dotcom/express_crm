const mongoose = require("mongoose");
const User = require("../models/UserModel");
const Customer = require("../models/CustomerModel");

const File = new mongoose.Schema({
  name: { type: String, required: true },
  path: { type: String, required: true },
  date: { type: Date, required: true },
  note: { type: String },
  customerRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("File", File);
