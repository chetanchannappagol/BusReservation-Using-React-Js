const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DataSchema = new Schema(
    {
        Data:Object
    },
    { timestamps: true }
  );
  
  
  module.exports = mongoose.model("Pdf", DataSchema);
  