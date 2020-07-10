const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=e0db9eb01d56c145f259a11d8bd07c9e&query=${latitude.toString()},${longitude.toString()}&units=f`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to services", undefined);
    } else if (response.body.error) {
      callback("Unable to find that location. ", undefined);
    } else {
      callback(undefined, {

        forecast: `${response.body.current.weather_descriptions[0]} Skies. It is ${response.body.current.temperature} degrees outside in ${response.body.location.name}. It feels like ${response.body.current.feelslike} and the humidity is ${response.body.current.humidity}%. `,
        time_of_day: response.body.current.is_day
      });
      
      const weatherMsg = `${response.body.current.weather_descriptions[0]} Skies. It is ${response.body.current.temperature} degrees outside in ${response.body.location.name}. It feels like ${response.body.current.feelslike}. `
      console.log(response.body);
       
    }
  });
};

module.exports = forecast;
