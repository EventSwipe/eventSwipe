var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database-mongo/index.js');
var apiHelper = require('./apihelper.js');

var app = express();
console.log(__dirname);
app.use(express.static(__dirname + '/../react-client/dist'));
//using body-parser middleware
app.use(bodyParser.json());

app.get('/favorite', (req, res) => {
  //manipuate req.body to fit query parameters
  var query = req.body;
  //make db call to get data
  db.selectEventByUsername(query, (err, data) => {
    //in callback send status 200 and send data
    if (err) console.error(err);
    else res.status(200).send(data);
  })
});

app.post('/login', (req, res) => {
//not yet until authentication
});

app.post('/events', (req, res) => {
//call to api
});

app.post('/insertEventToDb', (req, res) => {
  //manipulate req.body to fit query parameters
  var query = req.body;
  //make db call to change data
  db.addFavoriteEvent(query, (err, data) => {
    if (err) console.error(err);
    else res.sendStatus(200);
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

