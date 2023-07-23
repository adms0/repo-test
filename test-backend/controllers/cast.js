const { Cast, Movie } = require("../models/index")
const findAge = require("../helper/releaseYear")
class CastController {

    static getAllCast(req, res) {
        Cast.findAll({
            include: [Movie]
        })
            .then(cast => {
                res.render("casts", { cast })
            })
            .catch(err => {
                res.sen(err.message)
            })
    }

    static addCast(req, res) {
        res.render("cast-add")
    }

    static addPostCast(req, res) {
        const newCast = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone_number: req.body.phone_number,
            birth_year: req.body.birth_year,
            gender: req.body.gender
        }
        Cast.create(newCast, { individualHooks: true })
            .then(() => {
                res.redirect("/casts")
            })
            .catch(err => {
                res.send(err)
            })
    }

    static editCast(req, res) {
        const id = +req.params.id
        Cast.findByPk(id)
            .then(cast => {
                res.render("cast-edit", { cast })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static editPostcast(req, res) {
        const id = +req.params.id
        const updateCast = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone_number: req.body.phone_number,
            birth_year: req.body.birth_year,
            gender: req.body.gender
        }

        Cast.update(updateCast, {
            where: { id }
        })
            .then(() => {
                res.redirect("/casts")
            })
            .catch(err => {
                res.send(err.message)
            })
    }


    static deleteCast(req, res) {
        const id = +req.params.id
        Cast.destroy({ where: { id } })
            .then(() => res.redirect("/casts"))
            .catch(err => res.send(err.message))
    }

    static seeMovies(req, res) {
        const id = +req.params.id
        Cast.findByPk(id, {
            include: [Movie],
            order: [
                [{ model: Movie }, "id", "ASC"]
            ]
        })
        .then((data) => { 
            res.render('moviesee', {data, findAge})
        })
        .catch(err => res.send(err))
    }


}

module.exports = CastController