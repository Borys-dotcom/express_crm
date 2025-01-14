const express = require("express");
const router = express.Router();
const actionController = require("../controllers/ActionController");

    // GET
    router.get("/:id?", actionController.index)
    // POST add
    router.post("/add/:id", actionController.create)
    // DELETE add
    router.delete("/delete/:id", actionController.delete)

module.exports = router