var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test');
mongoose.connect('mongodb://eventswipe:event1@ds017248.mlab.com:17248/events', { useMongoClient: true});

var db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('open', () => {
  console.log('mongoose connected successfully');
});

//event data for each user
const eventSchema = mongoose.Schema({
  id: { type: Number },
  name: { type: String, required: true },
  description: { type: String },
  url: { type: String },
  location: { type: String },
  date: { type: Date },
  free: { type: Boolean },
  username: { type: String }
});

//user data for login
const userSchema = mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String }
});

const User = mongoose.model('User', userSchema);
const Event = mongoose.model('Event', eventSchema);

//return events by username
// add user here when authentication is setup
const getAllEvents = cb => {
  Event.find({}, (err, events) => {
    if (err) {
      console.error(`err in selectEventByUsername db/index.js: ${err}`);
      cb(err, null);
    } else {
      console.log(`events in selectEventByUsername db/index.js: ${events}`);
      cb(null, events);
    }
  });
};

//adding favorite events to database with username
const addFavorite = (favorite, cb) => {
  var newEvent = new Event({
    id: favorite.id,
    name: favorite.name,
    descpription: favorite.description,
    url: favorite.url,
    // location: favorite.location,
    date: favorite.date,
    free: favorite.free,
    // username: favorite.username
  });
  // console.log('34')
  newEvent.save(err => {
    if (err) {
      console.error(`err in newEvent.save: ${err}`);
      cb(err);
    } else {
      console.log('The new event has been saved into the database!');
      cb();
    }
  });
};

//deleting favorite event
// add username into argument when auth is setup
const deleteFavorite = (eventId, cb) => {
  // add username in remove as a property
  Event.findOneAndRemove({ _id: eventId }, err => {
    if (err) {
      console.error(`err in deleteEvent: ${err}`);
      cb(err);
    } else {
      console.log('Deleted from DB');
      cb()
    }
  });
};

//adding a new user to database
const addUser = (username, password, cb) => {
  var newUser = new User({
    username: username,
    password: password
  });

  newUser.save(err => {
    if (err) {
      console.error(`err in newUser.save: ${err}`);
    } else {
      console.log('The new user has been saved into the database!');
    }
  });
};

// Testing for database functions:
// let q = {
//   name: 'ROOFTOP PARTY SATURDAY NIGHT | HUDSON TERRACE',
//   description: "For BOTTLE SERVICE please email us at BOOKING (Add details) \r\n \r\nROOFTOP PARTY SATURDAY NIGHT   \r\nat\r\nHUDSON TERRACE ROOFTOP    \r\nNEW YORK CITY NIGHTCLUB \r\n621 West 46th Street \r\n \r\nMusic by :\r\nDJ DUBBS & GUEST\r\n \r\nDoors Open at 11pm\r\n \r\nTABLE RESERVATION FOR BOTTLE SERVICE, B'DAY PARTY OR ANY EVENT Please  send us an email to BOOKING\r\n \r\nGirls free till 12am $20 after  & Gents $20 -30 ( please arrive early to avoid long lines ) \r\n \r\n 21 and over with proper ID /FINAL ENTRENCE IS UPTO THE DOORMAN Discretion\r\n \r\n Must show tickets or SAY ICLUBNYC LIST  AT THE DOOR TO GET RIGHT IN \r\n \r\nSTRICT DRESS CODE POLICY: -Gentlemen: Shoes, Button down shirts, and jeans are acceptable. No \r\nbaggy attire, Sneakers, Boots, or Hats are allowed. -Ladies: Heels & classy look Please\r\n \r\n \r\nCONTACT US\r\n www.iclubnyc.com\r\n \r\n \r\n\r\n\r\nCLICK ON IMAGE \r\n\r\n\r\n\r\n",
//   id: '17434703664',
//   url: 'https://www.eventbrite.com/e/rooftop-party-saturday-night-hudson-terrace-tickets-17434703668?aff=ebapi',
//   date: '2018-09-08T23:00:00',
//   free: true
// };

// addFavorite(q, (err) => {
//   // console.log(`q: ${q}`);
//   if (err) {
//     console.error(`err in addFavorite: ${err}`);
//   } else {
//     // console.log(`data in addFavorite: ${data}`);
//   }
// });

// getAllEvents((err, data) => {
//   if (err) {
//     console.error(`111111: ${err}`);
//   } else {
//     console.log(`33333: ${data}`);
//   }
// });

// deleteFavorite('17434703664', (err) => {
//   if (err) {
//     console.error(`err in deleteFavorite: ${err}`);
//   } else {
//     console.log(`DELETED`);
//   }
// });

module.exports = {
  getAllEvents,
  addFavorite,
  addUser,
  deleteFavorite
};
