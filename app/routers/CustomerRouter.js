const express = require("express");
const router = express.Router();
const CustomerController = require("../controllers/CustomerController");

    // GET 
    router.get("/", CustomerController.index);
    // GET 
    router.get("/count", CustomerController.count);
    //POST add
    router.post("/add", CustomerController.add)
    //PUT update/:id
    router.put("/update/:id", CustomerController.update)
    //POST find/:id
    router.get("/find/:id", CustomerController.find)
    //POST delete/:id
    router.delete("/delete/:id", CustomerController.delete)
    // GET 
    router.get("/:page/:limit", CustomerController.indexPagination);

module.exports = router