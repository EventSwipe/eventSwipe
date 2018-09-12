const request = require('request');

let MEETUP_TOKEN = null;
let EVENTBRITE_TOKEN = null;
// Trying to resolve a non-existent file
// will result in an error
// The try block will attempt an error-prone action
// and if it doesn't work, the catch block runs
try {
  // The config.js file is ignored by git
  MEETUP_TOKEN = require('../config.js').MEETUP_TOKEN;
  EVENTBRITE_TOKEN = require('../config.js').EVENTBRITE_TOKEN;
} catch (err) {
  MEETUP_TOKEN = process.env.MEETUP_TOKEN;
  EVENTBRITE_TOKEN = process.env.EVENTBRITE_TOKEN;
}

//Generic api integration method (not used yet)
const getFromMeetUp = (query, cb) => {
  var location = query.location;
  var topic = query.topic;
  var options = { url: `https://api.meetup.com/find/upcoming_events?key=48416f2b301d68647614267b3651601c&text=${topic}` };
  request.get(options, (err, response) => {
    cb(err, response);
  });
};

const getFromEventBrite = (query, cb) => {
  var location = query.location;
  var topic = query.topic;
  var options = {
    url: `https://www.eventbriteapi.com/v3/events/search/?location.address=${location}&expand=organizer,venue&token=${EVENTBRITE_TOKEN}&q=${topic}`,
    headers: {
      //have to hardcode the key to be able to make request work (template literal is breaking it)
      Authorization: 'Bearer E5PTH3KVZH4MFUMMULAE'
    }
  };
  request.get(options, (err, response, body) => {
    cb(err, JSON.parse(body));
  });
};




module.exports = { getFromMeetUp, getFromEventBrite };
