const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const serviceProviderAvailabilitySchema = new Schema({

    id: Number,

    serviceproviderservicesid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'ServiceProviderService'
    },

    customerid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Customer'
    },

    reviewdate: { 
        type: Date, 
        default: new Date() 
    },

    reviewcomments: { 
        type: String,
        required : [true, 'Please provide the review comments']
    },

});


const ServiceProviderAvailability = mongoose.model('ServiceProviderAvailability', serviceProviderAvailabilitySchema, "service_provider_availabilities");
module.exports = ServiceProviderAvailability;