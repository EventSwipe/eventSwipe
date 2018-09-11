var express = require('express');
var bodyParser = require('body-parser');
var { getAllEvents, getEventsByQuery, addFavorite, deleteFavorite } = require('../database-mongo/index.js');
//require firebase
var admin = require('firebase-admin');
var serviceAccount = require('../eventswipe-firebase-adminsdk-s4uqe-a33e5e01b1.json')

var firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:'https://eventswipe.firebaseio.com'
})

//create autentication middleware
function isAuthenticated(request, response, next) {
  // check if user is logged in
  // if they are, attach them to the request object
  // if not, send to login page
}
var { getAllEvents, getTenEvents, getEventsByQuery, addFavorite, deleteFavorite } = require('../database-mongo/index.js');
var { getFromMeetUp, getFromEventBrite, sortApis } = require('./apihelper.js')

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

app.get('/favorites/ten', (req, res) => {
  // manipuate req.body to fit query parameters
  // make db call to get data
  //gets first 10
  
  getTenEvents(req.query.offset, (err, data) => {
    console.log(`check yore data`, data);
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
  let { favoriteEvent } = req.body.params;
  // console.log('app.post("/favorites"/)in the server index',req.body)
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

//get events from db helper
app.get('/events', (req, res) => {
  //makes the query the object from the body
  console.log(req.query)
  var query = {location: req.query.location,
    topic: req.query.topic
  }
  //call the apihelper function to return a promise
  getFromMeetUp(query, (err, data1) => {
    if (err) {
      console.error(err);
      res.status(404).send();
    }
    else {
      getFromEventBrite(query, (err, data2) => {
        if (err) {
          console.error(err);
          res.status(404).send(err);
        } else {
          console.log(data2)
          //insert 'JSON.parse(data1.body)' if want to add meetup data 
          res.status(200).send(data2.events);
        }
      })
    }
  })
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


app.get('/lol', (req, res) => {

})

let port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`listening on port ${port}!`);
});

