const express = require('express');
const path = require('path')
const app = express();
const PORT = 3000; //Can be changed as per your machine's situation

// Load routers
const indexRouter = require('./controllers/index.controller')

// Dev Tool
var logger = require('morgan');
app.use(logger('dev'));

// view engine setup
app.set('view engine', 'ejs');

// parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//serve static files
app.use(express.static('public'));

// Routes
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next({
    msg: 'Page not found',
    status: 404
  });
});
// error handler middleware
app.use(function(err, req, res, next) {
  console.log('ERROR Handling middleware in execution!!! --> ', err);

  res.status(err.status || 500);
  res.json({
    msg: err.msg || err,
    status: err.status || 404
  })

//   // render the error page
//   res.render('./pages/error', {
//     msg: err.msg || err
//   });
});

app.listen(PORT, (err) => {
    if(err){
        console.log('Error in LISTEN');
        return
    }
    console.log(`App is listening at http://localhost:${PORT}`);
})