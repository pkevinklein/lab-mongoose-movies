const express = require('express');
const router = express.Router();
const Celebrity = require('../models/Celebrity');
const Movie = require('../models/Movie');

router.get("/movies/new", (req, res) => {
  console.log("something");
  Celebrity.find().then(celebrities => {
    res.render("movies/newMovies", {
      celebrities
    })

  }).catch(error => console.log(error))

})

router.get("/movies", (req, res) => {
  Movie.find().populate("cast").then(movies => {
    console.log(movies);
  res.render("movies/index", {
    movies
  })
}).catch(err => console.log(err))
})



router.post("/movies", (req, res) => {
  console.log(req.body);
  const {title, genre, plot, cast} = req.body
  Movie.create({title, genre, plot, cast})
  .then(movie => {
    res.redirect("/movies")
  })
  .catch(error => console.log("error in post movie: ",error))
});

router.get("/movies/:id/edit", (req, res) => {
  const id = req.params.id;
  Movie.findById(id).then(movie => {
    res.render("movies/edit", {
      movie
    })
  }).catch(error => next(error))
})

router.post("/movies/:id", (req, res) => {
  const id = req.params.id;
  const { title, genre, plot, cast } = req.body;
  Movie.findByIdAndUpdate(id, {
    title, genre, plot, cast
})
.then(() => res.redirect('/movies'))
.catch(err => next(err));

})

module.exports = router;