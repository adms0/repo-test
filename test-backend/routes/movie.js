const router = require("express").Router()
const MovieController = require("../controllers/movie")

router.get("/", MovieController.getAllMovie)
router.get("/add", MovieController.addMovie)
router.post("/add", MovieController.addPostMovie)
router.get("/edit/:id", MovieController.editMovie)
router.post("/edit/:id", MovieController.editpostMovie)
router.get("/delete/:id", MovieController.deleteMovie)
router.get("/casts/add/:id", MovieController.getCastForm)
router.post("/casts/add/:id", MovieController.postCastForm)
module.exports = router