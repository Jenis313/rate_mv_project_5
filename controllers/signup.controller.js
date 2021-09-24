
const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const db = require('./../models/db.config');
const signupRouter = require('./../routes/index')



router.get('/',(req,res)=>{
    
// console.log(req.session);
//     res.send({
//         title: 'Signup page'
//     })

    res.render('pages/signup', {
        message: req.query.message
  })
})

router.post("/",(req,res) => {
    // 1. validate user data 
    const { firstname, lastname, email, password, confirm_password } = req.body


    // 2. check if the user already exists in db
    db.oneOrNone('SELECT * FROM users WHERE email = $1;', [email])
    .then(userExists => {
        if (userExists){
            // user exists, alert to prompt login
            res.redirect('/login?message=User%20already%20exists.')
        }
        else{
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
    // 3. hash password - clean the email
            const cleanedEmail = email.toLowerCase().trim()

            
    // 4. insert into db
            db.none('INSERT INTO users (userName, email, password) VALUES ($1, $2, $3)', [userName, cleanedEmail, hash])
            .then(()=>{
                res.redirect('/login?message=User%20successfully%20created.')
                
            })
            .catch((err)=>{
                console.log(err);
                res.json(err);
            })   
        }
    })
    .catch((err)=>{
        console.log(err);
        res.json(err);
    }) 
})

module.exports = router