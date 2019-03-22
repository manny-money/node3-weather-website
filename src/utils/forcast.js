const request = require('request');

const forcast = (latitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/6a9e83f423214eea80d07200c4fae41e/' + latitude + ',' + longitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined)
    } else if (body.error) {
      callback('Unable to find location', undefined)
    } else {
      callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
    }
  })
}

module.exports = forcast;