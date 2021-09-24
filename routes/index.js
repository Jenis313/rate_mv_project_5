require('dotenv').config();
const express = require ('express');
const morgan = require('morgan');
const session = require('express-session')
const signupRouter = require('./routes/signup');
const loginRouter = require('./routes/login');
const homeRouter = require('./routes/home');
const logoutRouter = require('./routes/logout');
const sessionConfig = require('./session');
const {redirectToLogin, redirectToHome} = require('./middleware');
const app = express()
const PORT = process.env.PORT || 3000

// body parser
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// view engine
app.set('view engine','ejs')

// session road
// app.use(session({
//   cookie:{
//     maxAge: 1000*60*60*24
//     // secure: process.env.NODE_ENV === true
//   },
//   name: 'mrcoffee_sid',
//   resave: false,
//   saveUninitialized: false,
//   secret: process.env.SESS_SECRET
// }))
app.use(session(sessionConfig))

// route middleware

app.use('/signup', redirectToHome, signupRouter)
app.use('/login', redirectToHome, loginRouter)
app.use('/logout',redirectToLogin, logoutRouter)
app.use('/', redirectToLogin, homeRouter)

// app.use(morgan('dev'))




app.listen(PORT, () => console.log(`App is listening at http://localhost:${PORT}`))