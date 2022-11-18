const { find } = require('../models/userModel')
const Vehicules = require('../models/vehiculeModel')
const Vehicule = require('../models/vehiculeModel')

const vehiculeCtrl = {
    getVehicules : async(req, res) => {
        try {
            const vehicules = await Vehicule.find()
            resizeBy.json(vehicules)
        } catch (error) {
            return resizeBy.status(500).json({message: error.message})
        }
    },

    createVehicule : async(req, res) => {
        console.log(req.body,'req');
        try {
            const {plaque, marque, modele, disponibilite, description, photo} = req.body
   
            const vehicule = await Vehicule.findOne({plaque})
            if (vehicule) return res.status(400).json({msg : "Un vehicule existe déja à cette immatriculation"})
            
            const newVehicule = new Vehicule({ plaque, marque, modele, disponibilite, description, photo })

            await newVehicule.save()
            res.json({msg : 'Vehicule créé'})
        } catch (error) {
            console.log(error);
            return(res.status(500).json({error:error.message}))
        }
    },

    deleteVehicule : async(req, res) => {
        try {
            await Vehicule.findByIdAndDelete(req.params.id)
            res.json({msg : "Vehicule supprimé"})
        } catch (error) {
            return res.status(400).json({msg : error.message})
        }
    },

    updateVehicule : async(req, res) => {
        try {
            const {plaque, marque, modele, disponibilite, description, photo} = req.body            
            await Vehicule.findOneAndUpdate({_id : req.params.id},{plaque, marque, modele, disponibilite, description, photo})
            res.json({msg : 'Infos du véhicule modifié'})
        } catch (error) {
            return res.status(400).json({msg : error.message})
        }
    }
    
}

module.exports = vehiculeCtrl