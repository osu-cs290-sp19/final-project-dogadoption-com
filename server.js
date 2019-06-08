var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var app = express();
var port = process.env.PORT || 3000;

var mongoHost = process.env.MONGO_HOST;
var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUser = process.env.MONGO_USER;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoDBName = process.env.MONGO_DB_NAME;

var mongoUrl = 'mongodb://' + mongoUser + ':' + mongoPassword + '@' + mongoHost + ':' + mongoPort + '/' + mongoDBName;
/*var mongoUrl = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDBName}`;*/
var db = null;

console.log("MONGOURL: ", mongoUrl);

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());


app.get('/', function(req, res, next) {
    var collection = db.collection('dogData');
    collection.find({}).toArray(function(err, dogData) {
        if (err) {
            res.status(500).send({
                error: "Error Fetching Dogs from DB"
            });
        } else {
            console.log("DOGS: " , dogData);
            res.status(200).render('adoptMePage', {
                dog: dogData
            });
        }
    });
});

app.post('/addDog', function (req, res, next) {
    console.log("in server: ", req.body);
    if (req.body && req.body.name && req.body.breed && req.body.price && req.body.gender && req.body.description && req.body.url) {
        var collection = db.collection('dogData');
        var dog = {
            name: req.body.name,
            breed: req.body.breed,
            price: req.body.price,
            gender: req.body.gender,
            description: req.body.description,
            url: req.body.url
        };
        console.log("dog",dog);
        collection.insertOne(dog);
    }
    else {
        next();
    }
});

app.post('/adoptDog', function(req, res, next) {
    if( req.body, req.body.name) {
        var collection = db.collection('dogData');
        collection.deleteOne({name: req.body.name});
    }
});

app.use(express.static('public'));

app.get('*', function(req, res) {
    res.status(404).render('404');
});

MongoClient.connect(mongoUrl,{ useNewUrlParser: true }, function(err, client) {
    if (err) {
        console.log("Couldnt connect mongo");
        throw err;
    }
    db = client.db(mongoDBName);
    app.listen(port, function () {
        console.log("== Server is listening on port", port);
    });
});
