const {Schema, model} = require('mongoose');



const orderSchema = new Schema({
    vehicule: {
        type: Schema.Types.ObjectId,
        ref: 'Vehicule',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    priceHT: {
        type: Number,
        required: true
    },
    priceTTC: {
        type: Number,
        required: true
    },
    statut: {
        type: String,
        enum: ['confirmed', 'cancelled', 'started', 'ended'],
        default: 'confirmed'
    },
    forfait : {
        type : String,
        enum: ['kilometre', 'jour'],
        required: true
    },
    nbJours : {
        type: Number
    },
    payed: {
        type : Boolean,
        required: true,
        default: false
    },

    idPayement: {
        type : String,
        required:false
    }
},
{
    timestamps : true
})



const Orders = model('Order', orderSchema);
module.exports = Orders