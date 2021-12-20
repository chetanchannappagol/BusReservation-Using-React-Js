const mongoose = require('mongoose')
const Schema = mongoose.Schema

// this will be our data base's data structure 
const DataSchema = new Schema(
    {
        FirstName: String,
        LastName: String,
        Email: String,
        Phone: Number,
        Password: String,
        ConfirmPassword: String, 
    },
    { timestamps: true }
  );
  
  // export the new Schema so we could modify it using Node.js
  module.exports = mongoose.model("userSchema", DataSchema);
  