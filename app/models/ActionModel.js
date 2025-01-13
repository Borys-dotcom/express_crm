const mongoose = require("mongoose");

const Action = new mongoose.Schema({
    type: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: String, required: true},
    customerRef: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "customers"
        }
});

module.exports = mongoose.model("Action", Action);
