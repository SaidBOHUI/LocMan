// const { user } = require('../models/userModel')
const Vehicule = require('../models/vehiculeModel')
// const axios = require('axios');

class APIfeatures{
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){}

    sorting(){}

    paginating(){}
}

const vehiculeCtrl = {
    getVehicules : async(req, res) => {
        try {
            const features = new APIfeatures(Vehicule.find(), req.query)
            const vehicules = await features.query
            res.json(vehicules)
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    },

    createVehicule : async(req, res) => {
        // console.log(req,'req');
        try {
            const {plaque, marque, modele, disponibilite, description, photo} = req.body
            if (!photo)return(res.status(400).json({msg: "Aucune image upload "}))
                
            // const files = req.files

            // console.log(req.body, 'req.body');
            // console.log(files, typeof files, 'FIIIIIILEs');

            // let options = {
            //     method: 'POST',
            //     url: 'http://localhost:8000/api/upload',
            //     // url: /api/upload
            //     headers: {
            //       Accept: 'application/json',
            //       'Content-Type': 'multipart/form-data',
            //     //   'Content-Type': 'application/json',
            //       Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzc4ZDg0ZjRjMDYzZTM5ZDY5MWI0MiIsImlhdCI6MTY2ODc3OTQ4NSwiZXhwIjoxNjY4ODY1ODg1fQ.YLttWeAiS57udUYUUc8eaLuz17wU61IUYwzdyZsrMfA'
            //     },
            //     files: files
            //   };
            //   console.log(options, 'options');
            // const res = await axios(options)
    
   
            const vehicule = await Vehicule.findOne({plaque})
            if (vehicule) return res.status(400).json({msg : "Un vehicule existe déja à cette immatriculation"})

            const newVehicule = new Vehicule({ plaque, marque, modele, disponibilite, description, photo })

            await newVehicule.save() 

            // res.json(newVehicule)
            res.json({msg : 'Vehicule créé'})
        } catch (error) {
            // console.log(error);
            return(res.status(500).json({msg:error.message}))
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
            if (!photo)return(res.status(400).json({msg: "Aucune image upload "}))
           
            await Vehicule.findOneAndUpdate({_id : req.params.id},{plaque, marque, modele, disponibilite, description, photo})
            res.json({msg : 'Infos du véhicule modifié'})
        } catch (error) {
            return res.status(500).json({msg : error.message})
        }
    }
}

module.exports = vehiculeCtrl