const { Movie, ProductionHouse, Cast, MovieCast } = require("../models/index")


class MovieController {

    static getAllMovie(req, res) {
        Movie.findAll({
            order: [["released_year", "DESC"]],
            include: [ProductionHouse]
        })
            .then(movie => {
                res.render("movies", { movie })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static addMovie(req, res) {
        let error = req.query.error
        res.render("movie-add", {error})
    }

    static addPostMovie(req, res) {
        let newMovie = {
            name: req.body.name,
            released_year: req.body.released_year,
            genre: req.body.genre
        }
        Movie.create(newMovie)
            .then(movie => {
                res.redirect("/movies")
            })
            .catch(err => (((err.name === "SequelizeValidationError") ? res.redirect(`/movies/add?error=${err.errors[0].message}`) : res.send(err))))
    }

    static editMovie(req, res) {
        const id = +req.params.id
        let selectPh = null
        Movie.findByPk(id)
            .then(ph => {
                selectPh = ph
                return ProductionHouse.findAll({
                    order: [["id", "ASC"]]
                })
            })
            .then(movie => {
                res.render("movie-edit", { data: selectPh, movie })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static editpostMovie(req, res) {
        const id = +req.params.id
        const updateMovie = {
            name: req.body.name,
            released_year: req.body.released_year,
            genre: req.body.genre,
            prodId: req.body.prodId
        }
        Movie.update(updateMovie, { where: { id } })
            .then(movie => {
                res.redirect("/movies")
            })
            .catch(err => {
                res.send(err)
            })
    }

    static deleteMovie(req, res) {
        const id = +req.params.id
        Movie.destroy({ where: { id } })
            .then(movie => res.redirect("/movies"))
            .catch(err => res.send(err))
    }


    static getCastForm(req, res) {
        const id = +req.params.id
        // let error = req.query.error || null
        let error = req.app.locals.errors || null
        delete req.app.locals.errors
        let selectMovie = null
    
        Movie.findByPk(id, {
            include: [Cast],
            
            order: [
                [{model : Cast}, "id", "ASC"]
            ]
        })
            .then(movie => {
                selectMovie = movie
                console.log(selectMovie);    
                return Cast.findAll({
                    order :[["id", "ASC"]]
                })
            })
            .then(casts => { 
                res.render('addMovieForm',{movie : selectMovie, casts, error})
            })
            .catch(err => {
                res.send(err)
            })
    }

    static postCastForm(req, res) {
        const movieId = +req.params.id
        const {role, castId} = req.body
        const newCastForm = {movieId, castId, role}
        MovieCast.create(newCastForm)
        .then((data) => res.redirect(`/movies/casts/add/${movieId}`))
        .catch(err => { 
            if (err.name === "SequelizeValidationError") { 
                req.app.locals.errors = err.errors[0].message
        
                res.redirect(`/movies/casts/add/${movieId}`)

            } 
        })
        // .catch(err => (((err.name === "SequelizeValidationError") ? res.redirect(`/movies/casts/add/movieId?error=${err.errors[0].message}`) : null)))
    }

}
module.exports = MovieController