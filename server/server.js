require('dotenv').config()

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var apiStart = require('./exchanges/apiStart.js');

var exchangeNames = ['binance', 'poloniex'];

var app = express();

var io = require("socket.io")(app);

io.on("connection", handleClient);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(express.static(path.join(__dirname, 'client')));

app.get('*', function(req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Bitra is Running on port: ' + (process.env.PORT || 3000))
});