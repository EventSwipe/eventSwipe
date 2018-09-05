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

const eventSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  url: { type: String },
  location: { type: String },
  date: { type: Date },
  free: { type: Boolean }
});

const Event = mongoose.model('Event', eventSchema);
const selectAll = (cb) => {
  Event.find({}, (err, events) => {
    if(err) {
      console.error(`err in selectAll db/index.js: ${err}`);
      cb(err, null);
    } else {
      console.log(`events in selectAll db/index.js: ${events}`);
      cb(null, events);
    }
  });
};

module.exports = { selectAll };