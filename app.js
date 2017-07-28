 var express = require('express');
var app = express();
var fs = require('fs')
var path = require('path')
var bodyParser = require('body-parser')
var port = process.env.PORT || 8080

app.set('views', './views');
app.set('view engine', 'jade');

app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())

const apiRouter = require(process.cwd() + '/routes.js');
app.use('/', apiRouter);
require('events').EventEmitter.prototype._maxListeners = 100;



app.listen(port, function() {
    console.log("App is listening at " + port)
});
