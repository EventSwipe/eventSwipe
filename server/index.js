const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { getAllEvents, getEventsByQuery, addFavorite, deleteFavorite, getTenEvents } = require('../database-mongo/index.js');
const { getFromMeetUp, getFromEventBrite, sortApis } = require('./apihelper.js');
const admin = require('firebase-admin');
const serviceAccount = require('../eventswipe-firebase-adminsdk-s4uqe-a33e5e01b1.json');

const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:'https://eventswipe.firebaseio.com'
})

//create autentication middleware
const isAuthenticated = (request, response, next) => {
  // check if user is logged in
  // if they are, attach them to the request object
  // if not, send to login page
<<<<<<< HEAD
}

var { getAllEvents, getTenEvents, getEventsByQuery, addFavorite, deleteFavorite } = require('../database-mongo/index.js');
var { getFromMeetUp, getFromEventBrite, sortApis } = require('./apihelper.js')
=======
};
>>>>>>> dev

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());

<<<<<<< HEAD
app.get('/loggedin/:uid', (req, res) => {
  admin.auth().getUser(req.params.uid)
  .then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log("Successfully fetched user data:", userRecord.toJSON());
  })
  .catch(function(error) {
    console.log("Error fetching user data:", error);
  });
})

=======
>>>>>>> dev
app.get('/favorites', (req, res) => {
  getAllEvents((err, data) => {
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
  // manipuate req.body to fit query parameters make db call to get data gets first 10
  getTenEvents(req.query.offset, (err, data) => {
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
  // makes the query the object from the body
  var query = { location: req.query.location, topic: req.query.topic };
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
          if (data2.events.length > 25) {
            data2.events = data2.events.slice(0, 25);
          } 
          data1.body = JSON.parse(data1.body);
          res.status(200).send([...data1.body.events, ...data2.events]);
        }
      });
    }
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


app.get('/lol', (req, res) => {

});

let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});

