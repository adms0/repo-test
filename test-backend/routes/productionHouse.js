const router = require("express").Router()
const ProductionHouseController = require("../controllers/productionHouse")

router.get("/", ProductionHouseController.getAllPh)

module.exports = router