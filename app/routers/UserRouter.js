const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

//POST add
router.post("/add", UserController.create);
//POST login
router.post("/login", UserController.login);

module.exports = router;
