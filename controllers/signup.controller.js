
const express = require('express')
const router = express.Router()
const db = require('./../models/db.config');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const  configs = require('./../configs/index');
const {body, validationResult} = require('express-validator');

// Sign Token
function generateToken(data){
    return jwt.sign({
        id: data.id,
        first_name: data.first_name,
        email: data.email
    }, configs.JWT_SECRET/*, {
        expiresIn: '1d'
    }*/)
}


router.get('/',(req, res, next) => {
  res.render('pages/signup',{
    currentUser: req.currentUser
  })
})
router.post('/', 
    // Express validator
    body('userName', "Name cannot be empty")
    .notEmpty(),

    body('email', "Empty or invalid email")
    .isEmail(),
    body('email').custom(value => {
        return db.oneOrNone('SELECT * FROM users WHERE email = $1', value)
        .then((user) => {
            if(user){
                return Promise.reject('Email already in use');
            }
        })
    }), 

    body('password', "Password cannot be empty")
    .notEmpty(),
    body('password', "Password must be longer than 6 characters and contain a letter, a number and a special character")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "i"),

    body('confirm_password').custom((value, { req }) => {
        if (value !== req.body.password) {
        throw new Error("Password confirmation does not match");
        }
        // Indicates the success of this synchronous custom validator
        return true;
    }),
   (req, res, next) => {
    const result = validationResult(req); //It stores all the errors
    // get data from form 
    // Make sure there is no any errors
    // save data into database
    if(!result.isEmpty()){
        console.log('errors array --> ', result.errors);
        res.render('./pages/signup.ejs', {
            errors: result.errors,
            currentUser: req.currentUser
        })
        // res.json({
        //     err: result.errors
        // })
    }else{
    
        const {userName, email, password} = req.body;
        const cleanedEmail = email.toLowerCase().trim()
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if(err){
                return next(err);
            }
            db.oneOrNone("INSERT INTO users(username, email, password) VALUES ($1, $2, $3) RETURNING *" , [userName, cleanedEmail, hash])
            .then((user) => {
                let token = generateToken(user);//It generates a token for the user
                // console.log('token ---> ', token)
                res.cookie('jwt', token)
                res.redirect('/')
                // res.json(user); 
            })
            .catch((err) => {
                console.log(err);
                next(err);
            })
        });
    }

})
module.exports = router