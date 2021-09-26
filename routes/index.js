
const express = require ('express');
const session = require('express-session')
const router = express.Router();
const sessionConfig = require('../session');

router.use(session(sessionConfig))

const {redirectToLogin, redirectToHome} = require('./../middlewares/authentication');



const signupRouter = require('./../controllers/signup.controller');
const loginRouter = require('./../controllers/login.controller');
const homeRouter = require('./../controllers/index.controller');
const logoutRouter = require('./../controllers/logout.controller');



router.use('/signup', redirectToHome, signupRouter)
router.use('/login', redirectToHome, loginRouter)
router.use('/logout',redirectToLogin, logoutRouter)
router.use('/', redirectToLogin, homeRouter)


module.exports = router;