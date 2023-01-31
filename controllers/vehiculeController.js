// const { user } = require('../models/userModel')
const Vehicule = require('../models/vehiculeModel')
// const axios = require('axios');

class APIfeatures{
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
        const queryObj = {...this.queryString} // queryString = req.query
         
        const excludedFields = ['page', 'sort','limit' ]
        excludedFields.forEach(el => delete(queryObj[el])) 

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)
        //gte greater than or equal
        //gt greater than 
        //lte lesser than or equal
        //lt lesser than 
        //url regex=xyz recupere tous les éléments contenant xyz

        this.query.find(JSON.parse(queryStr))
        return this;
    }

    sorting(){
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
            console.log(sortBy);
        }else{
            this.query = this.query.sort('-CreatedAt')
        }
        return this;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9 
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const vehiculeCtrl = {
    getVehicules : async(req, res) => {
        try {
            const features = new APIfeatures(Vehicule.find(), req.query).filtering().sorting().paginating()

            const vehicules = await features.query
            res.json({
                status : 'success',
                result : vehicules.length,
                vehicules : vehicules 
            })
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    },

    createVehicule : async(req, res) => {
        // console.log(req,'req');
        try {
            const {plaque, marque, modele, disponibilite, description, photo, type, couleur, nbPlaces, kilometrage, moteur, embrayage, baseFixe, prixKm, prixJour, prixCaution} = req.body
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

            const newVehicule = new Vehicule({ plaque, marque, modele, disponibilite, description, photo, type, couleur, nbPlaces, kilometrage, moteur, embrayage, baseFixe, prixKm, prixJour, prixCaution })

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
            console.log('in controller');
            // const {plaque, marque, modele, disponibilite, description, type, couleur, nbPlaces, kilometrage, moteur, embrayage, baseFixe, prixKm, prixCaution} = req.body 
            const {plaque, marque, modele, disponibilite, description, photo, type, couleur, nbPlaces, kilometrage, moteur, embrayage, baseFixe, prixKm, prixJour, prixCaution} = req.body 
            if (!photo)return(res.status(400).json({msg: "Aucune image upload "}))
           
            await Vehicule.findOneAndUpdate({_id : req.params.id},{plaque, marque, modele, disponibilite, description, photo, type, couleur, nbPlaces, kilometrage, moteur, embrayage, baseFixe, prixKm,prixJour, prixCaution})
            res.json({msg : 'Infos du véhicule modifiées'})
        } catch (error) {
            console.log(error, 'error back');
            return res.status(500).json({msg : error.message})
        }
    },

    getDataVehicule : async(req, res) => {
        try {
            let vehicule = await Vehicule.findById(req.params.id)
            // console.log(vehicule, 'vehicule in controller');
            res.json({
                status : 'success',
                vehicule : vehicule 
            })

        } catch (error) {
            return res.status(500).json({msg : error.message})
        }
    }
}

module.exports = vehiculeCtrl