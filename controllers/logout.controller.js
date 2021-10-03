const express = require('express');
const router = express.Router();

// Logout Router
router.get('/', (req, res, next) => {
    res.cookie('jwt', '', {
        maxAge: 1
    })
    res.redirect('/');
})
module.exports = router;