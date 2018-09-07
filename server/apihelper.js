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
let getFromEventBriteApi = function (query) {
  //zip code, topic, free?
  var location = query.location;
  var topic = query.topic;
  return axios.get('https://api.meetup.com/find/groups?key=48416f2b301d68647614267b3651601c&zip=11211&radius=1&category=14&order=members', {params: 
    {
      'upcoming_events': true,
      'q': topic
    }
  });
};

module.exports = { getFromEventBriteApi };
