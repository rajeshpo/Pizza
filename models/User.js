var mongoose = require("mongoose");


var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    password:{
      type: String,
      trim: true,
      required: true,
    },
    role: {
      type: Number,
      default: 0
    },
   
  },
  { timestamps: true }
);


module.exports = mongoose.models.User || mongoose.model("User",userSchema);