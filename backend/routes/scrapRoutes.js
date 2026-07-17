const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
  createScrap,
  getAllScrap,
  updateScrap, deleteScrap
} = require("../controllers/scrapController");

router.post("/", auth, createScrap);
router.get("/", auth, getAllScrap);

router.put("/:id", auth, updateScrap);

router.delete("/:id", auth, deleteScrap);


module.exports = router;