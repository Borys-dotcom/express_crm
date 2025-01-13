const express = require("express");
const router = express.Router();
const CustomerController = require("../controllers/CustomerController");

    // GET 
    router.get("/", CustomerController.index);
    //POST add
    router.post("/add", CustomerController.add)
    //PUT update/:id
    router.put("/update/:id", CustomerController.update)
    //POST find/:id
    router.get("/find/:id", CustomerController.find)
    //POST delete/:id
    router.delete("/delete/:id", CustomerController.delete)

module.exports = router