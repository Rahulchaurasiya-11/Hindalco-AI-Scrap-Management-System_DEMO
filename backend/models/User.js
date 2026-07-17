const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true
  },
  email:{
    type:String,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  role:{
    type:String,
    enum:["ADMIN","MANAGER","USER"],
    default:"USER"
  },
  departmentId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Department"
  }
});

module.exports = mongoose.model("User",UserSchema);