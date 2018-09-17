const mongoose = require('mongoose');
const {MLAB_USERNAME} = require('../config.js')
const {MLAB_PASSWORD} = require('../config.js')

//change username and password in config.js
mongoose.connect(`mongodb://${MLAB_USERNAME}:${MLAB_PASSWORD}@ds017248.mlab.com:17248/events` || 'mongodb://localhost/test', { useMongoClient: true } );

const db = mongoose.connection;

db.on('error', () => console.log('mongoose connection error'));

db.once('open', () => console.log('mongoose connected successfully'));

// event schema
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

// user schema
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

// return events by uid
const getAllEvents = (uid, cb) => {
  Event.find({ uid: uid }, (err, events) => {
    if (err) {
      //console.error(`err in selectEventByUsername db/index.js: ${err}`);
      cb(err, null);
    } else {
      //console.log(`events in selectEventByUsername db/index.js: ${events}`);
      cb(null, events);
    }
  });
};

//adding a new user to database
const addUser = (userData) => {
  //create a new user document
  //you can put this inside the User.find function below 
  const newUser = new User({
    uid: userData.uid,
    userInfo: {
      displayName: userData.displayName,
      email: userData.email,
      photoUrl: userData.photoURL
    },
  });
  
  //check if user exists in database before saving to db 
  User.find({uid: userData.uid}, (err, data) => {
    if (err) {
      console.error(`err in User.find: ${err}`);
    } 
    if (data.length === 0) {
      newUser.save((err) => {
        if (err) {
          console.error(`err in newUser.save: ${err}`);
        } else {
          console.log('The new user has been saved into the database!');
        }
      });
    } else {
      console.log('User already exists in the db');
    }
  });
};

// adding favorite events to database with username
const addFavorite = (favorite, cb) => {
  //fun fun fun...
  //new event document
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
  //save new event to database
  newEvent.save(err => {
    if (err) {
      //console.error(`err in newEvent.save: ${err}`);
      cb(err);
    } else {
      //you can use the console.log below to check if data was saved into database
      //console.log('The new event has been saved into the database!');
      cb();
    }
  });
};

// deleting favorite event by the id mongo automatically adds 
const deleteFavorite = (mongoId, cb) => {
  Event.findOneAndRemove({ _id: mongoId }, err => {
    if (err) {
      //console.error(`err in deleteEvent: ${err}`);
      cb(err);
    } else {
      //console.log('Deleted from DB');
      cb();
    }
  });
};

module.exports = { getAllEvents, addFavorite, addUser, deleteFavorite };
