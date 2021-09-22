const express = require('express');
const app = express();
const PORT = 3131; //Can be changed as per your machine condition

app.get('/', (req, res, next) => {
    res.send('welcome!')
})


app.listen(PORT, (err) => {
    if(err){
        console.log('Error in LISTEN');
        return
    }
    console.log("App listening on port ", PORT);
})