const express = require("express");
const router = express.Router();
const actionController = require("../controllers/ActionController");

    // GET index - find all actions for customer
    router.get("/:id?", actionController.index)
    // GET find - find single action
    router.get("/find/:id?", actionController.find)
    // POST add
    router.post("/add/:customerId", actionController.create)
    // POST edit
    router.put("/edit/:id", actionController.edit)
    // DELETE add
    router.delete("/delete/:id", actionController.delete)

module.exports = router