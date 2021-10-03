const JWT = require('jsonwebtoken');
const configs = require('./../configs/index');
const db = require('./../models/db.config');

module.exports = function(req, res, next){
    // Check if there is token in the request
    // if there is no token, just call next()
    // if token, check if the token is verified or not with the help of JWT.verify
    // after verification, test if the details of verified token are still up-to-date with database because jwt token works even after the deletion of the user of that token.
    // if token is up-to-date, put the fresh users detail from databasee in request object. 
    
    const token = req.cookies.jwt
    // console.log('token-->',token);
    if(!token){
        console.log('No token')
        return next();
    }else{
        //Token available now
        JWT.verify(token, configs.JWT_SECRET, (err, result) => {
            if(err){
                return next(err);
            }
            // console.log('result--> ', result)
            // console.log('Token verification successful'); 
            // Now check if the token details are up-to-date with the database
            db.one("SELECT * FROM users WHERE id = $1", result.id)
            .then((user) => {
                // Case token verified but not up-to-date with db
                if(!user){
                    return next({
                        msg: 'User removed from the system',
                        status: 404  
                    })
                }
                // Case token verified and up-to-date with database
                // console.log('current user--> ',user);
                // Set user's detail to request object
                req.currentUser = user;
                next()
            })
            .catch((err) => {
                // Query error
                next(err);
            })
        })
    }
}