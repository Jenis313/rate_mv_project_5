const express = require('express');
const router = express.Router();
const db = require('./../models/db.config');

// Put this code inside third party API folder
router.get('/rating-score/:id', (req, res, next) => {
    // Get average rating based on movie id
    // console.log('req param id--->', req.params.id)
    db.any('SELECT rating FROM mv_ratings WHERE movie_id = $1', [req.params.id])
    .then((data) => {
        let average_rating = 0;
        let total_reviews = 0;
        if(data.length === 0){
            average_rating = 0;
            total_reviews = 0;
        }else{
            let total_rating = 0;
            data.forEach((rating_obj) => {
                total_rating = total_rating + rating_obj.rating;
            })
            average_rating = (total_rating/data.length).toFixed(1);
            total_reviews = data.length;
        }
        res.json({
            average_rating,
            total_reviews 
        });
    })
    .catch((err) => {
        res.json(err);
    })
})

router.get('/:id', (req, res, next) => {
    const user = req.currentUser;
    if(!user){
        // If no currentUser in request 
        res.render("./pages/movie.ejs",{
            movieId : req.params.id,
            currentUser : req.currentUser //Sends undefined value
        })
    }else{
        db.oneOrNone('SELECT rating FROM mv_ratings WHERE movie_id = $1 AND user_id = $2', [req.params.id, user.id])
        .then((data) => {
            if(!data){
                // if currentuser exists but hasn't rated
                res.render("./pages/movie.ejs",{
                    currentUser: user,
                    movieId : req.params.id,
                    login: true,
                    canRate: true
                })
            }else{
                // if currentUser exists and already rated
                res.render("./pages/movie.ejs",{
                    currentUser: user,
                    movieId : req.params.id,
                    login: true,
                    canRate: false,
                    rating: data.rating
                })
                
            }
        })
        .catch((err) => {
            next(err);
        })
    }
})

router.post('/:id', (req, res, next) => {
    console.log(req.body);
    db.none("INSERT INTO mv_ratings(movie_id, user_id, rating) VALUES ($1, $2, $3)" , [req.body.movieId, req.body.userId, req.body.score])
            .then(() => {
                console.log('put rating into database')
            })
            .catch((err) => {
                next(err);
            })
})
module.exports = router;