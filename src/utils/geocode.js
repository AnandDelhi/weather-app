const request = require("request");

const geocode = function (address, callback) {
  const url = `http://api.weatherapi.com/v1/current.json?key=5f15584a6bc748a7bdf122443220307&q=${address}`;
  request({ url: url, json: true }, (error, response) => {
    if (response) {
      callback(undefined, {
        location: response.body.location.name,
        latitude: response.body.location.lat,
        longitude: response.body.location.lon,
      });
    } else if (response.body.error.message) {
      console.log("Unable to show coordinates, try another location");
    } else if (!response) {
      callback("unable to connect to the internet");
    }
  });
};

module.exports = geocode;
