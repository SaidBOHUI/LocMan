const router = require('express').Router();
const orderCtrl = require('../controllers/orderController')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.post("/create", auth, orderCtrl.createOrder)

router.put("/edit", auth, orderCtrl.editOrder)

router.put("/cancel/:id", auth, orderCtrl.cancelOrder)
// router.delete("/cancel/:id", auth, orderCtrl.cancelOrder)

router.get("/takenDates", orderCtrl.getOrders)

router.get("/getAll", orderCtrl.getAllOrders)

router.get("/:id", auth, orderCtrl.getAnOrder)


module.exports = router

