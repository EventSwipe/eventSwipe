const axios = require('axios');
let _TOKEN = null;
// Trying to resolve a non-existent file
// will result in an error
// The try block will attempt an error-prone action
// and if it doesn't work, the catch block runs
try {
  // The config.js file is ignored by git
  _TOKEN = require('./config.js')._TOKEN;
} catch (err) {
  _TOKEN = process.env._TOKEN;
}

//Generic api integration method (not used yet)
let getEventsByQuery = function (query) {
  //zip code, topic, free?
  var location = query.location;
  var topic = query.topic;
  // return axios.get('https://www.example.com/v3/events/search/?token='+_TOKEN, {params: 
  //   {
  //     'location.address': location,
  //     'q': topic
  //   }
  // });
};

module.exports.getEventsByQuery = getEventsByQuery;
