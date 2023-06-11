const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const bookingSchema = new Schema({

    id: Number,

    serviceprovideravailabilityid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'ServiceProviderAvailability'
    },

    customerid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Customer'
    },

    totalprice: { 
        type: Number, 
        required : [true, 'Please enter the address']
    },

    comments: { 
        type: String
    },

    status: { 
        type: String
    }

});


const Booking = mongoose.model('Booking', bookingSchema, "bookings");
module.exports = Booking;