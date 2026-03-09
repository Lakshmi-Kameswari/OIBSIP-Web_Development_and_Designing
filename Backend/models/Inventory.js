const mongoose = require("mongoose")

const InventorySchema = new mongoose.Schema({

    item:String,
    quantity:Number

})

module.exports = mongoose.model("Inventory",InventorySchema)
