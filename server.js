var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var app = express();
var port = process.env.PORT || 3000;
var dogData = require('./dogData');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function(req, res, next) {
    res.status(200).render('adoptMePage', {dogData});
});

app.use(express.static('public'));

app.get('*', function(req, res) {
    res.status(404).render('404');
});