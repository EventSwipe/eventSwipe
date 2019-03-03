const mongoose = require('mongoose');
mongoose.connect('mongodb://eventswipe:event1@ds017248.mlab.com:17248/events' || 'mongodb://localhost/test', { useMongoClient: true } );

const db = mongoose.connection;

db.on('error', () => console.log('mongoose connection error'));

db.once('open', () => console.log('mongoose connected successfully'));

// event data for each user
const eventSchema = mongoose.Schema({
  id: { type: String, unique: true },
  name: { type: String },
  description: { type: String},
  url: { type: String },
  location: { type: String },
  date: { type: Date },
  time: { type: String },
  end: { type: Date },
  free: { type: String },
  logo: { type: String },
  uid: { type: String }
});

// user data for login
const userSchema = mongoose.Schema({
  uid: { type: String },
  userInfo: {
    displayName: String,
    email: String,
    photoUrl: String
  },
});

const User = mongoose.model('User', userSchema);
const Event = mongoose.model('Event', eventSchema);

// return events by username
// add user here when authentication is setup
const getAllEvents = (uid, cb) => {
  Event.find({ uid: uid }, (err, events) => {
    if (err) {
      console.error(`err in selectEventByUsername db/index.js: ${err}`);
      cb(err, null);
    } else {
      cb(null, events);
    }
  });
};

//adding a new user to database
const addUser = (userData) => {
  const newUser = new User({
    uid: userData.uid,
    userInfo: {
      displayName: userData.displayName,
      email: userData.email,
      photoUrl: userData.photoURL
    },
    // favorites: { type: Object, required: true }
  });
  
  User.find({uid: userData.uid}, (err, data) => {
    if (err) {
      console.log(`err in User.find: ${err}`);
    } 
    if (data.length === 0) {
      newUser.save((err) => {
        if (err) {
          console.error(`err in newUser.save: ${err}`);
        } else {
        }
      });
    } else {
      console.log('User already exists in the db');
    }
  });
};

// adding favorite events to database with username
const addFavorite = (favorite, cb) => {
  console.log('fave', favorite);
  var newEvent = new Event({
    id: favorite.id,
    name: favorite.name && !favorite.name.text ? favorite.name : favorite.name.text,
    description: favorite && favorite.plain_text_description ? favorite.plain_text_description : favorite && favorite.description && favorite.description.text ? favorite.description.text.replace(/<p[^>]*>/g, '').replace(/<\/p>/g, '').replace(/<a[^>]*>/g, '').replace(/<\/a>/g, '').replace(/<br[^>]*>/g, '').replace(/<\/br>/g, '').replace(/<img[^>]*>/g, '').replace(/<\/img>/g, '') : favorite && favorite.description ? favorite.description.replace(/<p[^>]*>/g, '').replace(/<\/p>/g, '').replace(/<a[^>]*>/g, '').replace(/<\/a>/g, '').replace(/<br[^>]*>/g, '').replace(/<\/br>/g, '').replace(/<img[^>]*>/g, '').replace(/<\/img>/g, '') : null,
    url: favorite.url || favorite.link,
    location: favorite.address ? favorite.address : favorite.venue && favorite.venue.address && favorite.venue.address.address_1 ? favorite.venue.address.address_1 + ' ' + favorite.venue.address.city : favorite.venue ? favorite.venue.address_1 + ' ' + favorite.venue.city || favorite.venue.address.localized_address_display : favorite.group && favorite.group.localized_location ? favorite.group.localized_location : null,
    date: favorite.start ? favorite.start.local : favorite.local_date,
    time: favorite.local_time || null,
    end: favorite.end ? favorite.end.local : null,
    free: favorite.fee ? favorite.fee.currency + favorite.fee.amount + ' ' + favorite.fee.description : favorite.is_free === true ? 'Free' : favorite.is_free === false ? 'Not Free' : null,
    logo: favorite.logo ? favorite.logo.url : favorite.featured_photo ? favorite.featured_photo.highres_link : favorite.group && favorite.group.photo ? favorite.group.photo.highres_link : null, 
    uid: favorite.uid, 
  });

  newEvent.save(err => {
    if (err) {
      console.error(`err in newEvent.save: ${err}`);
      cb(err);
    } else {
      cb();
    }
  });
};

// deleting favorite event
const deleteFavorite = (mongoId, cb) => {
  Event.findOneAndRemove({ _id: mongoId }, err => {
    if (err) {
      console.error(`err in deleteEvent: ${err}`);
      cb(err);
    } else {
      cb();
    }
  });
};

module.exports = { getAllEvents, addFavorite, addUser, deleteFavorite };
