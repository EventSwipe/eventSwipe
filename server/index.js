const express = require('express');
const bodyParser = require('body-parser');
// DB and API functions
const { getAllEvents, addFavorite, deleteFavorite, addUser } = require('../database-mongo/index.js');
const { getFromMeetUp, getFromEventBrite } = require('./apihelper.js');
// Authentication resources
const admin = require('firebase-admin');
const serviceAccount = require('../eventswipe-firebase-adminsdk-s4uqe-a33e5e01b1.json');

const app = express();

const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:'https://eventswipe.firebaseio.com'
});

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());

// User authentication with local database
app.get('/loggedin/:uid', (req, res) => {
  admin.auth().getUser(req.params.uid)
    .then((userRecord) => {
      addUser(userRecord); // See the UserRecord reference doc for the contents of userRecord.
    })
    .catch((error) => {
      console.log('Error fetching user data:', error);
    });
});

// Get all events for specific user
app.get('/favorites/:uid', (req, res) => {
  getAllEvents(req.params.uid, (err, data) => {
    if (err) {
      console.error(`err in app.get /favorite: ${err}`);
      res.status(400).send();
    } else {
      res.status(200).send(data);
    }
  });
});

// Add favorites for specific user
app.post('/favorites/:uid', (req, res) => {
  let { favoriteEvent } = req.body.params;
  addFavorite(favoriteEvent, (err) => {
    if (err) {
      console.error(`err in app.post /favorites: ${err}`);
      res.status(400).send(err);
    } else {
      res.status(201).send();
    }
  });
});

// Delete favorites based on mongoId (not specifically eventId)
app.delete('/favorites', (req, res) => {
  let { eventId } = req.body;
  deleteFavorite(eventId, (err, data) => {
    if (err) {
      console.error(`err in app.delete /favorites: ${err}`);
      res.status(400).send(err);
    } else {
      res.status(202).send(data);
    }
  });
});

//get events from db helper
app.get('/events', (req, res) => {
  // makes the query the object from the body
  var query = { location: req.query.location, topic: req.query.topic, startDate: req.query.startDate, endDate: req.query.endDate };
  // call the apihelper function to return a promise
  getFromMeetUp(query, (err, data1) => {
    if (err) {
      console.error(err);
      res.status(404).send();
    } else {
      getFromEventBrite(query, (err, data2) => {
        if (err) {
          console.error('err in getFromEventBrite:', err);
          res.status(404).send(err);
        } else {
          if (data2.events && data2.events.length > 25) {
            data2.events = data2.events.slice(0, 25);
          } 
          data1.body = JSON.parse(data1.body);
          if (data1.body.events && data1.body.events.length > 1 && !data1.body.errors) {
            res.status(200).send([...data1.body.events, ...data2.events]);
          } else if (data2.events && data2.events.length > 1) {
            res.status(200).send([...data2.events]);
          } else {
            res.status(404).send('error in app.get /events');
          }   
        }
      });
    }
  });
});

let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});

