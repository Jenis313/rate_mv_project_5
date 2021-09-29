
const express = require('express')
const router = express.Router()
const db = require('./../models/db.config');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const  configs = require('./../configs/index');
// const signupRouter = require('./../routes/index')

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
  res.render('pages/signup')
})
router.post('/', (req, res, next) => {
    // const result = validationResult(req); //It stores all the errors
    // get data from form 
    // Make sure there is no error
    // save data into database
    // if(!result.isEmpty()){
    //     res.render('./pages/register.ejs', {
    //         errors: result.errors
    //     })
    // }else{
    
        const {username, email, password} = req.body;
        const cleanedEmail = email.toLowerCase().trim()
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if(err){
                return next(err);
            }
            db.oneOrNone("INSERT INTO users(username, email, password) VALUES ($1, $2, $3) RETURNING * " , [username, cleanedEmail, hash])
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
    // }

})
module.exports = router