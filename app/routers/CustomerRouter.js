const express = require("express");
const router = express.Router();
const CustomerController = require("../controllers/CustomerController");

// module.exports = () => {
    // GET 
    router.get("/", CustomerController.index);
    //POST add
    router.post("/add", CustomerController.add)
    //POST update/:id
    router.post("/update/:id", CustomerController.update)
    //POST find/:id
    router.post("/find/:id", CustomerController.find)
    //POST delete/:id
    router.delete("/delete/:id", CustomerController.delete)

    // return router
// }

module.exports = router