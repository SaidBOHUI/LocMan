const router = require('express').Router()
const vehiculeCtrl = require('../controllers/vehiculeController')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/vehicules')
.get(vehiculeCtrl.getVehicules)
.post(auth, authAdmin, vehiculeCtrl.createVehicule)

router.route('/vehicule/:id')
.delete(auth, authAdmin, vehiculeCtrl.deleteVehicule)
.put(auth, authAdmin, vehiculeCtrl.updateVehicule)
.get(vehiculeCtrl.getDataVehicule)



module.exports = router