const {Schema, model} = require('mongoose');
let validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


const userSchema = new Schema({
    email : {
        type : String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        validate: [validateEmail, "Entrez une adresse email valide s'il vous plait"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Entrez une adresse email valide s'il vous plait"]
    },
    password : {
        type : String,
        required: true
    },
    firstName : { 
        type : String,
        required: true,
        trim : true
    },
    lastName : {
        type : String,
        required: true
    },
    role : {
        type : Number,
        default: 0
    },
    tel : {
        type : String,
        required: true
    },
    adresse : {
        type : String,
        required: true
    },
    CP : {
        type : Number,
        required: true
    },
    city : {
        type : String,
        required: true
    },
    permisNum : {
        type : String,
        required: true,
        unique: true,
    }
},
{
    timestamps : true
})

const Users = model('User', userSchema);
module.exports = Users