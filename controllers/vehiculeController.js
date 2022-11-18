const { find } = require('../models/userModel')
const Vehicules = require('../models/vehiculeModel')
const Vehicule = require('../models/vehiculeModel')
const axios = require('axios');

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
            const {plaque, marque, modele, disponibilite, description, file} = req.body
   
            const vehicule = await Vehicule.findOne({plaque})
            if (vehicule) return res.status(400).json({msg : "Un vehicule existe déja à cette immatriculation"})

            // console.log(file, 'file');
            let options = {
                method: 'POST',
                url: 'http://localhost:8000/api/upload',
                // url: /api/upload
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzc4ZDg0ZjRjMDYzZTM5ZDY5MWI0MiIsImlhdCI6MTY2ODc3OTQ4NSwiZXhwIjoxNjY4ODY1ODg1fQ.YLttWeAiS57udUYUUc8eaLuz17wU61IUYwzdyZsrMfA'
                },
                files: file
              };
            const res = await axios(options)
            const photo = res.url

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