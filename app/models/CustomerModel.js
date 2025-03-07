const mongoose = require("mongoose");

const Customer = new mongoose.Schema({
  name: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: { type: String, required: true },
  },
  taxNumber: { type: String, required: true },
  actions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Action"
    },
  ],
  files: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File"
    },
  ],
});

module.exports = mongoose.model("Customer", Customer);
