const express = require("express");
const router = express.Router();
const actionController = require("../controllers/ActionController");

    // GET
    router.get("/:id?", actionController.index)
    // POST add
    router.post("/add/", actionController.create)

module.exports = router