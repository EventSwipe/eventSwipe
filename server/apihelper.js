const request = require('request');

let MEETUP_TOKEN = null;
let EVENTBRITE_TOKEN = null;
// Trying to resolve a non-existent file will result in an error
// The try block will attempt an error-prone action and if it doesn't work, the catch block runs
try { // The config.js file is ignored by git
  MEETUP_TOKEN = require('../config.js').MEETUP_TOKEN;
  EVENTBRITE_TOKEN = require('../config.js').EVENTBRITE_TOKEN;
} catch (err) {
  MEETUP_TOKEN = process.env.MEETUP_TOKEN;
  EVENTBRITE_TOKEN = process.env.EVENTBRITE_TOKEN;
}

//Generic api integration method (not used yet)
const getZipCodeBasedOnLonAndLat = (zip, cb) => {
  let options = { url: `https://us-zipcode.api.smartystreets.com/lookup?auth-id=17c47573-337b-42f4-aee1-73c39539d6fd&auth-token=WpTpsyzxwL5MKIslmj57&city=&state=&zipcode=${zip}`};
  request.get(options, (err, results) => {
    if (err) {
      console.error(`err in getZipCode: ${err}`);
      cb(err, null);
    } else {
      // console.log('results in getZip', JSON.stringify(results.body.zipcodes));
      cb(null, results);
    }
  });
};

const getFromMeetUp = (query, cb) => {
  var location = query.location;
  var topic = query.topic;
  getZipCodeBasedOnLonAndLat(location, (err, data) => {
    if (err) {
      console.error('err in call for getZip', err);
      cb(err, null);
    } else {
      data = JSON.parse(data.body);
      let lat = data[0].zipcodes[0].latitude;
      let lon = data[0].zipcodes[0].longitude;
      var options = { url: `https://api.meetup.com/find/upcoming_events?key=48416f2b301d68647614267b3651601c&text=${topic}&lat=${lat}&lon=${lon}` };
      request.get(options, (err, results) => {
        if (err) {
          console.error(`err in request.get to zipcode: ${err}`);
          cb(err, null);
        } else {
          cb(null, results);
        }
      });
    }
  });
};

const getFromEventBrite = (query, cb) => {
  var location = query.location;
  var topic = query.topic;
  var options = {
    url: `https://www.eventbriteapi.com/v3/events/search/?location.address=${location}&expand=organizer,venue&token=${EVENTBRITE_TOKEN}&q=${topic}`,
    headers: { Authorization: 'Bearer E5PTH3KVZH4MFUMMULAE' } // have to hardcode the key to be able to make request work (template literal is breaking it)
  };
  request.get(options, (err, response, body) => {
    cb(err, JSON.parse(body));
  });
};




module.exports = { getFromMeetUp, getFromEventBrite };
