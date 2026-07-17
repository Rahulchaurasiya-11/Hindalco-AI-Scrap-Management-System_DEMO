const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
  getInventory
} = require("../controllers/inventoryController");

router.get("/", auth, getInventory);

module.exports = router;