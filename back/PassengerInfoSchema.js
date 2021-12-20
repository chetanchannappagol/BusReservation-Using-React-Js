const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DataSchema = new Schema(
    {
                Name: String,
                Email: String,
                Phone: Number,
                Gender: String,
                BusType: String,
                Arrivals: String,
                Departure: String,
                SeatNo:Array,
                Cost:Number,
                Date:String
    },
    { timestamps: true }
  );
  
  
  module.exports = mongoose.model("PassengerInfoSchema", DataSchema);
  