var express = require('express');
var bodyParser = require('body-parser');
// var items = require('../database-mongo');

var app = express();
console.log(__dirname);
app.use(express.static(__dirname + '/../react-client/dist'));
//using body-parser middleware
app.use(bodyParser.json());

app.get('/favorite', (req, res) => {

});

app.post('/login', (req, res) => {

});

app.post('/events', (req, res) => {

});

app.post('/insertEventToDb', (req, res) => {
  
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

