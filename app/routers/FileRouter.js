const express = require("express");
const router = express.Router();
const FileController = require("../controllers/FileController");

// POST
router.post("/upload", FileController.upload);
// GET
router.get("/find/:id", FileController.index);

module.exports = router;
