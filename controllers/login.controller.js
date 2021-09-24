const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const db = require('./../models/db.config');

router.get('/',(req,res)=>{

    res.render('pages/login', {
        message: req.query.message
      })
    
})

router.post('/',(req,res)=>{
    const {email, password} = req.body
    // 1. validate (e.g. joi)

    // 2. Check db if email exists alr
        //2.1 Clean email
    const cleanedEmail = email.toLowerCase().trim()

    db.oneOrNone('SELECT * FROM users WHERE email = $1;', email)
    .then(userExists => {
        if (!userExists) {
            res.redirect('/login?message=User%20credentials%20incorrect')   
        } else {
    // 3. verify pw and edit session (e.g. regEx)
            bcrypt.compare(password,userExists.password)
            .then(result => {
                if (result) {
                    // console.log(userExists.id);
                    req.session.userId = userExists.id;
                    // edit session and redirect success msg
                //    res.send(`Greetings ${userExists.firstname}!<br> You will be redirected in a moment!
                //    <script>
                //    const timeout = 3000;
               
                //    setTimeout(() => {window.location = "http://localhost:5000/";}, timeout);
                //    </script>
                //    `)

                res.render("pages/greetings",{
                    userExists
                })
                  
                   
                    
                }
                else{
                    res.redirect('/login?message=User%20credentials%20incorrect')
                }
            })
            .catch(err =>{
                console.log(err);
                res.send(err);
            })  
        }
    })
    .catch(err=>{
        console.log(err);
        res.send(err);
    })
})

module.exports = router