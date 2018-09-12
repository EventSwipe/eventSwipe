const mongoose = require('mongoose');
mongoose.connect('mongodb://eventswipe:event1@ds017248.mlab.com:17248/events' || 'mongodb://localhost/test', { useMongoClient: true } );

const db = mongoose.connection;

db.on('error', () => console.log('mongoose connection error'));

db.once('open', () => console.log('mongoose connected successfully'));

// event data for each user
const eventSchema = mongoose.Schema({
  id: { type: Number },
  name: { type: String, required: true },
  description: { type: String },
  url: { type: String },
  location: { type: String },
  date: { type: Date },
  end: { type: Date },
  free: { type: Boolean },
  username: { type: String },
  logo: { type: String }
});

// user data for login
const userSchema = mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String }
});

const User = mongoose.model('User', userSchema);
const Event = mongoose.model('Event', eventSchema);

// return events by username
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

// Returns first ten events, sorted by dates starting from now
const getTenEvents =  (offset, cb) => {
  var num = Number(offset);
  Event.find({ date: { '$gte' : new Date }})
    .sort({ date: +1 })
    .skip(num)
    .limit(10)
    .exec((err, events) => {
      if (err) {
        console.error(`err in  getTenEvents  db/index.js: ${err}`);
        cb(err, null);
      } else {
        console.log(`events in  getTenEvents  db/index.js: ${events}`);
        cb(null, events);
      }
    });
};

// adding favorite events to database with username
const addFavorite = (favorite, cb) => {
  var newEvent = new Event({
    id: favorite.id,
    name: favorite.name.text || favorite.name,
    description: favorite.description.text || favorite.name,
    url: favorite.url || favorite.link,
    date: favorite.start ? favorite.start.local : favorite.local_date,
    time: favorite.local_time || null,
    end: favorite.end ? favorite.end.local : null,
    free: favorite.is_free || true,
    logo: favorite.logo ? favorite.logo.original.url : null,
    // location: favorite.location,
    // username: favorite.username
  });
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

// deleting favorite event
// add username into argument when auth is setup
const deleteFavorite = (mongoId, cb) => {
  // add username in remove as a property
  Event.findOneAndRemove({ _id: mongoId }, err => {
    if (err) {
      console.error(`err in deleteEvent: ${err}`);
      cb(err);
    } else {
      console.log('Deleted from DB');
      cb();
    }
  });
};

//adding a new user to database
const addUser = (username, password) => {
  const newUser = new User({
    username: username,
    password: password
  });

  newUser.save((err) => {
    if (err) {
      console.error(`err in newUser.save: ${err}`);
    } else {
      console.log('The new user has been saved into the database!');
    }
  });
};

module.exports = { getAllEvents, getTenEvents, addFavorite, addUser, deleteFavorite };
