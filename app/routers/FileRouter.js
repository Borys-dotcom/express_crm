const express = require("express");
const router = express.Router();
const FileController = require("../controllers/FileController");

// POST
router.post("/upload", FileController.upload);
// GET
router.get("/find/:id", FileController.index);
// DELETE
router.delete("/delete/:customerId/:fileId", FileController.delete);
// GET
router.get("/download/:id", FileController.download);

module.exports = router;
