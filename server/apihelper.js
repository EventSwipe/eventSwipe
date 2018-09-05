const axios = require('axios')
let EVENT_BRITE_TOKEN = null
// Trying to resolve a non-existent file
// will result in an error
// The try block will attempt an error-prone action
// and if it doesn't work, the catch block runs
try {
  // The config.js file is ignored by git
  EVENT_BRITE_TOKEN = require('./config.js').EVENT_BRITE_TOKEN
} catch (err) {
  EVENT_BRITE_TOKEN = process.env.EVENT_BRITE_TOKEN
}

let getEventsByQuery = function (query) {
  //zip code, topic, free?
  var location = query.location;
  var topic = query.topic;
  return axios.get('https://www.eventbriteapi.com/v3/events/search/?token='+EVENT_BRITE_TOKEN, {params: 
    {
      'location.address': location,
      'q': topic
    }
  });
}




module.exports.getEventsByQuery = getEventsByQuery;