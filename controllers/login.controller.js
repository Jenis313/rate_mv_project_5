const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('./../models/db.config');
const jwt = require('jsonwebtoken');
const  configs = require('./../configs/index');
// const {body, validationResult} = require('express-validator');

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

router.get('/',(req, res, next)=>{
    res.render('pages/login',{
        currentUser: req.currentUser
    })
})

router.post('/',(req, res, next)=>{
    const {email, password} = req.body;

    //Clean email
    const cleanedEmail = email.toLowerCase().trim()

    db.oneOrNone('SELECT * FROM users WHERE email = $1;', cleanedEmail)
    .then((user) => {
      // console.log('user --> ', user)
      if(!user){
          res.render('./pages/login.ejs', {
              error : 'Invalid Credientials!',
              currentUser: req.currentUser //sends undefined value and ejs will work based upon this undefined result
          })
          return 
      }
      //User found now, verify password
      const hash = user.password
      bcrypt.compare(password, hash)
      .then((result) => {
          // if verified, generate token, set token into header and redirect to home page
          if(result){
              let token = generateToken(user);//It generates a token for the user
              // console.log('token --> ', token)
              res.cookie('jwt', token);
              res.redirect('/');
              // res.send('Success Now you are logged in')
          }else{
              res.render('./pages/login.ejs', {
                  error : 'Invalid Credientials!',
                  currentUser: req.currentUser
              })
            //   res.send('Invalid credientials')
          }
      })
      .catch((err) => {
        next(err);
      })
    })
    .catch((err)=>{
        next(err);
    })
  })
module.exports = router