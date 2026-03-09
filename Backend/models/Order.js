const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({

    userId:String,

    base:String,
    sauce:String,
    cheese:String,
    veggies:[String],

    status:{
        type:String,
        default:"Order Received"
    },

    paymentId:String

})

module.exports = mongoose.model("Order",OrderSchema)
