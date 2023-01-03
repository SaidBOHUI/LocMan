const {Schema, model} = require('mongoose');

const vehiculeSchema = new Schema({
    modele : {
        type : String,
        required : true
    },
    marque : {
        type : String,
        required: true,
    },
    plaque : {
        type : String,
        required : true,
        unique: true,
    },
    photo : {
        type : Object,
        required : false
    },
    disponibilite : {
        type : Boolean,
        required : true,
        default : true
    },
    description : {
        type : String,
        required : true
    },
    type : {
        type : String,
        required : true
    },
    couleur : {
        type : String,
        required : true
    },
    nbPlaces : {
        type : Number,
        required : true
    },
    kilometrage : {
        type : Number,
        required : true
    },
    moteur : {
        type : String,
        required : true
    },
    embrayage : {
        type : String,
        required : true
    },
    prixLoc : {
        type : Number,
        required : true
    },
    prixKm : {
        type : Number,
        required : true
    },
    prixCaution : {
        type : Number,
        required : true
    }
},{timestamps : true})

const Vehicules = model('Vehicule', vehiculeSchema);
module.exports = Vehicules