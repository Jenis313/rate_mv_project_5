
module.exports.redirectToLogin = (req, res, next)=>{
    console.log(req.session.userId);
   
    // if req.session.userId === undefined
    if(!req.session.userId){
        // console.log("helo");
        res.clearCookie('mrcoffee_sid')
        res.redirect('/login')
    }
    else{
        // console.log("asd");
        next()
    }
}


module.exports.redirectToHome = (req, res, next) =>{

    console.log(req.session.userId);
    if(req.session.userId){
        res.redirect('/')
    }
    else{
        next()
    }
}