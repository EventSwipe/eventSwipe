import {MEETUP_KEY} from './config.js'

var fbConfig = {
    apiKey: 'AIzaSyBVvm08-ZC3kUIHp9O0tY-ES1g1IDN1NC8',
    authDomain: 'eventswipe.firebaseapp.com',
    databaseURL: 'https://eventswipe.firebaseio.com',
    projectId: 'eventswipe',
    storageBucket: 'eventswipe.appspot.com',
    messagingSenderId: '855689724386'
};

console.log(MEETUP_KEY)
firebase.initializeApp(fbConfig);