let request = require('request');

let url1 = `http://localhost:3001/lightOn`;
let url2 = `http://localhost:3001/lightOff`;

request(url1, function (err, response, body) {
  if (err) {
    console.log('error:', err);
  }
});

request(url2, function (err, response, body) {
  if (err) {
    console.log('error:', err);
  }
});
