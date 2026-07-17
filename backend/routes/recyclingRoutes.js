const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
  recycleScrap,
  getRecyclingLogs
} = require("../controllers/recyclingController");

router.post("/", auth, recycleScrap);

router.get("/", auth, getRecyclingLogs);

module.exports = router;