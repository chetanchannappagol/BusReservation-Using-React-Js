const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DataSchema = new Schema(
    {
        Travels: String,
        Route: String,
        From:String,
        To:  String,
        Fare :Number,
        TotalSeats:Number,
        Departure:String,
        Arrivals:String,
        BusType:String,
        BookedSeats: Array,
        Date:String,
        RouteId:Number
    },
    { timestamps: true }
);

module.exports = mongoose.model("AvailableBusSchema", DataSchema);
