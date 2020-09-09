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
  Movie.findById(id).populate("cast").then(movie => {
    Celebrity.find().then(celebrities => {
      const filteredCelebrities = celebrities.filter(celeb => {
        if(!movie.cast) return celeb
        let includesCeleb = movie.cast.find(celebFromCast => celebFromCast.name.includes(celeb.name))
        if(!includesCeleb) return celeb
      })
      res.render("movies/edit", {
        movie,
        filteredCelebrities
      })
      
    })
  }).catch(error => next(error))
})

router.post("/movies/:id", (req, res) => {
  const id = req.params.id;
  console.log(req.body.cast);
  const { title, genre, plot, cast } = req.body;
  Movie.findByIdAndUpdate(id, {
    title, genre, plot, cast
  })
  .then(() => {
    console.log(title);
  res.redirect('/movies')})
.catch(err => next(err));

})

module.exports = router;