const express = require("express");

const router = express.Router();

const { exportPDF } =
require("../controllers/reportsController");

router.get("/pdf", exportPDF);

module.exports = router;