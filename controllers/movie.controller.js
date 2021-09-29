const express = require('express');
const router = express.Router();
const db = require('./../models/db.config');

router.get('/', (req, res, next) => {
    res.render("./pages/movie.ejs",{
        token: true
    })
})
router.get('/rating-score/:id', (req, res, next) => {
    // Get average rating based on movie id
    console.log(req.params.id)
    db.any('SELECT rating FROM mv_ratings WHERE movie_id = $1', [req.params.id])
    .then((data) => {
        let total_rating = 0;
        data.forEach((rating_obj) => {
            total_rating = total_rating + rating_obj.rating;
        })
        res.json({
            average_rating: total_rating/data.length
        });
    })
    .catch((err) => {
        res.json(err);
    })
})

module.exports = router;