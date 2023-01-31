
const Orders = require('../models/orderModel');
const { findById } = require('../models/vehiculeModel');
const Vehicules = require('../models/vehiculeModel')


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

const orderCtrl = {

    seChevauche: async(req, res) => {
        try {
            const { startDate, endDate, vehicule } = req.body;
            const existingReservations = await Orders.find({ vehicule, startDate: { $lte: endDate }, endDate: { $gte: startDate } });
            if (existingReservations.length !== 0) {
                return true
            }else{
                return false
            }
        } catch (error) {
            return res.status(500).json({msg : error.message})
        }
    },

    createOrder: async (req, res) => {
        try {
            const { startDate, endDate, priceHT, priceTTC, statut, forfait, vehicule, user, payed, nbJours, idPayement } = req.body;
            const existingReservations = await Orders.find({ vehicule, startDate: { $lte: endDate }, endDate: { $gte: startDate } });
            if (existingReservations.length) {
                return res.status(400).json({ msg: 'Cette voiture est déja réservée à la période que vous avez entré' });
            }else{
                const newOrder = new Orders({
                    startDate, endDate, priceHT, priceTTC, statut, forfait, vehicule, user, payed, nbJours, idPayement
                })
                let sauvegarde = await newOrder.save()
                console.log(sauvegarde, 'sauvegarde');
                let id = sauvegarde._id
                return res.json({msg: 'Votre commande à bien été prise en compte. Vous allez être redirigé vers la plateforme de paiement ', _id: id})
            }
        } catch (error) {
            return res.status(500).json({msg : error.message})
        }
    },

    editOrder : async (req, res) => {
        try {
            
        } catch (error) {
            
        }
    },

    cancelOrder : async (req, res) => {
        try {
            let findOrder = await Orders.findById(req.params.id)
            if (findOrder.statut == 'cancelled') {
                return(res.status(400).json({msg : 'La commande est déja annulée'}))
            }
            else if (findOrder.statut == 'started') {
                return(res.status(400).json({msg : 'Vous ne pouvez pas annuler une prestation dont vous bénéficiez deja'}))
            }
            else if (findOrder.statut == 'ended') {
                return(res.status(400).json({msg : 'Vous ne pouvez pas annuler une prestation déja terminée'}))
            }
            else{
                console.log('');
            await Orders.findOneAndUpdate({_id : req.params.id},{statut: 'cancelled'})
            console.log('statut cancelled');
            res.json({msg : 'Votre commande a été annulée avec succès'})}
        } catch (error) {
            return res.status(500).json({msg : error.message})
        }
    },

    getOrders : async(req, res) => {
        try {
            const vehiculeId = req.params.id;

            Orders.find({ id: vehiculeId }, (err, orders) => {
                if (err) {
                    return res.status(400).json({msg : "échec de la requête en base de donnée"});
                } else {
                    console.log(orders);
                    return res.json({orders : orders})
                }
            })
        } catch (error) {
            return res.status(500).json({msg : error.message})
        }
    },

    getAnOrder : async(req, res) => {
        try {
            
        } catch (error) {
            
        }
    },

    getAllOrders : async(req, res) => {
        try {
            // console.log(req.user, 'req.user');
            const features = new APIfeatures(Orders.find(), req.query).filtering().sorting().paginating()

            const orders = await features.query
            console.log(orders, 'orders');
            return res.json({
                result : orders.length,
                orders : orders 
            })
        } catch (error) {
            return res.status(500).json({msg : error.message})
        }
    }
}

module.exports = orderCtrl