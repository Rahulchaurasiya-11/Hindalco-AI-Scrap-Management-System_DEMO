const mongoose = require("mongoose");

const ScrapSchema = new mongoose.Schema({

  scrapName: String,

  scrapType: {
    type: String,
    enum: ["Aluminum", "Copper", "Steel", "Hazardous"]
  },

  weight: Number,

  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department"
  },

  status: {
    type: String,
    enum: ["PENDING", "RECYCLED"],
    default: "PENDING"
  },

  createdDate: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Scrap", ScrapSchema);
