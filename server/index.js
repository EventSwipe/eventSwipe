var express = require('express');
var bodyParser = require('body-parser');
var { getAllEvents, getEventsByQuery, addFavorite, deleteFavorite } = require('../database-mongo/index.js');
var apiHelper = require('./apihelper.js');

var app = express();
app.use(express.static(__dirname + '/../react-client/dist'));
//using body-parser middleware
app.use(bodyParser.json());

app.get('/favorites', (req, res) => {
  // manipuate req.body to fit query parameters
  // make db call to get data
  getAllEvents((err, data) => {
    // in callback send status 200 and send data
    if (err) {
      console.error(`err in app.get /favorite: ${err}`);
      res.status(400).send();
    } else {
      // console.log(`data in app.get /favorites: ${data}`);
      res.status(200).send(data);
    }
  });
});

app.post('/favorites', (req, res) => {
  let { favoriteEvent } = req.body;
  addFavorite(favoriteEvent, (err) => {
    if (err) {
      console.error(`err in app.post /favorites: ${err}`);
      res.status(400).send(err);
    } else {
      res.status(201).send();
    }
  });
});

app.delete('/favorites', (req, res) => {
  // add username to this once auth is setup
  console.log('666666666666666666666', req.body);
  let { eventId } = req.body;
  deleteFavorite(eventId, (err, data) => {
    
    if (err) {
      console.error(`err in app.delete /favorites: ${err}`);
      res.status(400).send(err);
    } else {
      // console.log(`data in app.delete /favorites: ${data}`);
      res.status(202).send(data);
    }
  });
});

//NOT BEING USED RIGHT NOW... ONLY FOR FUTURE API INTEGRATION
app.post('/events', (req, res) => {
  //makes the query the object from the body
  let { query } = req.body;
  //call the apihelper function to return a promise
  getEventsByQuery(query)
    //send the data and success code with data
    .then((data) => {
      // console.log(`data in app.post /events: ${data}`);
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
  addFavorite(query, (err, data) => {
    if (err) {
      console.error(`err in app.post /insertEventToDb: ${err}`);
      res.status(400).send(err);
    } else {
      // console.log(`data in app.post /insertEventToDb: ${data}`);
      res.status(200).send(data);
    }
  });
});

app.post('/login', (req, res) => {
  // not yet until auth

});

app.listen(3000, () => {
  console.log('listening on port 3000!');
});
