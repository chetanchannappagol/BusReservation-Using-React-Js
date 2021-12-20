const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DataSchema = new Schema(
    {
        Email: String,
        Password: String,
        Name:String
    },
    { timestamps: true }
  );
  
  
  module.exports = mongoose.model("LoginSchema", DataSchema);
  