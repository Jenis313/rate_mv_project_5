const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    // console.log('currentUser---->', req.currentUser);
    res.render("./pages/index.ejs",{
        currentUser : req.currentUser
    })
})

module.exports = router;