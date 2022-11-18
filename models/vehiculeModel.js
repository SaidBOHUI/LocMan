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
        type : String,
        required : true
    },
    disponibilite : {
        type : Boolean,
        required : true,
        default : true
    },
    description : {
        type : String,
        required : true
    }
})

const Vehicules = model('Vehicule', vehiculeSchema);
module.exports = Vehicules