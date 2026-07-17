const mongoose = require("mongoose");

const RecyclingSchema = new mongoose.Schema({

  scrapId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Scrap"
  },

  recycledMaterial:String,

  quantity:Number,

  recycleDate:{
    type:Date,
    default:Date.now
  }

});

module.exports = mongoose.model("Recycling",RecyclingSchema);