var express = require('express');
var bodyParser = require('body-parser');
var { selectEventByUsername, getEventsByQuery, addFavoriteEvent } = require('../database-mongo/index.js');
var apiHelper = require('./apihelper.js');

var app = express();
console.log(__dirname);
app.use(express.static(__dirname + '/../react-client/dist'));
//using body-parser middleware
app.use(bodyParser.json());

app.get('/favorite', (req, res) => {
  //manipuate req.body to fit query parameters
  var query = req.query;
  //make db call to get data
  selectEventByUsername(query, (err, data) => {
    //in callback send status 200 and send data
    if (err) {
      console.error(`err in app.get /favorite: ${err}`);
      res.status(400).send();
    } else {
      console.log(`data in app.get /favorites: ${data}`);
      res.status(200).send(data);
    }
  })
});

app.post('/login', (req, res) => {
  //not yet until authentication

});

//NOT BEING USED RIGHT NOW... ONLY FOR FUTURE API INTEGRATION
app.post('/events', (req, res) => {
  //makes the query the object from the body
  let { query } = req.body;
  //call the apihelper function to return a promise
  getEventsByQuery(query)
    //send the data and success code with data
    .then((data) => {
      console.log(`data in app.post /events: ${data}`);
      res.status(200).send(data);
    })
    //catch and handle the error
    .catch((err) => {
      console.error(`err in app.post /events: ${data}`);
      res.status(404).send(err);
    });
});

app.post('/insertEventToDb', (req, res) => {
  //manipulate req.body to fit query parameters
  var { query } = req.body;
  //make db call to change data
  addFavoriteEvent(query, (err, data) => {
    if (err) {
      console.error(`err in app.post /insertEventToDb: ${err}`);
      res.status(400).send(err);
    } else {
      console.log(`data in app.post /insertEventToDb: ${data}`);
      res.status(200).send(data);
    }
  });
});

app.listen(3000, () => {
  console.log('listening on port 3000!');
});
