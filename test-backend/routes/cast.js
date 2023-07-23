const router = require("express").Router()
const CastController = require("../controllers/cast")

router.get("/", CastController.getAllCast)
router.get("/add", CastController.addCast)
router.post("/add", CastController.addPostCast)
router.get("/edit/:id", CastController.editCast)
router.post("/edit/:id", CastController.editPostcast)
router.get("/delete/:id", CastController.deleteCast)
router.get("/movies/:id", CastController.seeMovies)
module.exports = router