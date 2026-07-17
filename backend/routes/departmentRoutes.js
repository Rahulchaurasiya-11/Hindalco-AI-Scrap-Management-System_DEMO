const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
  getDepartments
} = require("../controllers/departmentController");

router.get("/", auth, getDepartments);

module.exports = router;