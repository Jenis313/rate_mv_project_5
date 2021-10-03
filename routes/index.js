const express = require ('express');
const router = express.Router();

// Load contollers
const indexRouter = require('./../controllers/index.controller')
const movieRouter = require('./../controllers/movie.controller')
const loginRouter = require('./../controllers/login.controller')
const signupRouter = require('./../controllers/signup.controller')
const logoutRouter = require('./../controllers/logout.controller')

// Routes
router.use('/', indexRouter);
router.use('/logout', logoutRouter);
router.use('/movie', movieRouter);
router.use('/login', loginRouter);
router.use('/signup', signupRouter);

module.exports = router;