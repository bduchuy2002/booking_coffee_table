const mongoose = require("mongoose");
const coffeeSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    address: {
        type: String,

    },
    phone: {
        type: String,
    },
    open: {
        type: String,
    },
    distance: {
        type: String,
    },
    describe: {
        type: String,
    },
    rate: {
        type: String,
    },
    
    table: [{
        tableID:  {
            type: String,
            ref: "BookingCoffee",
            required: true
        },
        slot: {
            type: String,
            required: true
        },
        status: {
            type: Boolean
        }
    }]
});
const customerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        
    },
    lastName: {
        type: String,
        
    },
    email: {
        type: String,
        required: true,
        
    },
    phoneNumber: {
        type: String,
        
    },
    address: {
        type: String
    },  
    booking: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "BookingCoffee",
    }

    ],
    password: {
        type: String,
        required: true,
    }
   
});
const bookingSchema = new mongoose.Schema({
    idCustomer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    idCoffee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Coofee",
        required: true
    },
    name:{
        type: String,
        required: true
    },
   address:{
        type: String,
        required: true
    },
        
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
       required: true
    },
    
    tableBooking:[{
        type: String,
        
        required: true
    }]
    
    

});

let Booking = mongoose.model("BookingCoffee", bookingSchema);

let Customer = mongoose.model("Customer", customerSchema);
let Coofee = mongoose.model("Coofee", coffeeSchema);
module.exports = { Customer,Coofee,Booking };