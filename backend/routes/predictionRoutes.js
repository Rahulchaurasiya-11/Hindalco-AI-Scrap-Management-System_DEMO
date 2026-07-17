const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
  predict
} = require("../controllers/predictionController");

router.get("/", auth, predict);

module.exports = router;