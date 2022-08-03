const request = require("request");

const forecast = function (address, callback) {
  const url = `http://api.weatherapi.com/v1/current.json?key=5f15584a6bc748a7bdf122443220307&q=${address}`;
  request({ url: url, json: true }, (error, response) => {
    if (response) {
      callback(undefined, {
        location: response.body.location.name,
        temperature: response.body.current.temp_c,
        condition: response.body.current.condition.text,
      });
    } else if (response.body.error.message) {
      console.log("Unable to connect to weather systems");
    } else if (!response) {
      callback("unable to connect to the internet");
    }
  });
};

module.exports = forecast;
