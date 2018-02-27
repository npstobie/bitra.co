var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');

var app = express();


app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

// app.use(express.static(path.join(__dirname, 'client')));

app.get('*', function(req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
  console.log('PenPals Landing Page is Running on port: ' + (process.env.PORT || 3000))
});
