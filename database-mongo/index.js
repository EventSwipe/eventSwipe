var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test');
mongoose.connect('mongodb://eventswipe:event1@ds017248.mlab.com:17248/events');

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
  username: {type: String, required: true }
});

//user data for login
const userSchema = mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String }
})

const User = mongoose.model('User', userSchema);
const Event = mongoose.model('Event', eventSchema);

//return events by username
const selectEventByUsername = (username, cb) => {
  Event.find({username : username}, (err, events) => {
    if(err) {
      console.error(`err in selectEventByUsername db/index.js: ${err}`);
      cb(err, null);
    } else {
      console.log(`events in selectEventByUsername db/index.js: ${events}`);
      cb(null, events);
    }
  });
};

//adding favorite events to database with username
const addFavoriteEvent = (query) => {
  var newEvent = new Event({
    id: query.id,
    name: query.name,
    descpription: query.description,
    url: query.url,
    location: query.location,
    date: query.date,
    free: query.free,
    username: query.username
  })

  newEvent.save((err) => {
    if (error) console.error(err)
    else {
      console.log('The new event has been saved into the database')
    }
  })
}

//adding a new user to database
const addUser = (username, password, cb) => {
  var newUser = new User({
    username: username,
    password: password
  })
  
  newUser.save((err) => {
    if (error) console.error(err)
    else {
      console.log('The new user has been saved into the database')
    }
  })
}

//deleting favorite event
const deleteEvent = (eventId, username) => {
  Event.remove({id:eventId, username:username}, (err) => {
    console.error(err)
  })
}


module.exports = { selectEventByUsername, addFavoriteEvent, addUser, deleteEvent };