'use strict';
const axios = require('axios');

class Forecast {
  constructor(DayObject){
    //console.log(DayObject);
    //this.name = DayObject.city_name;
    this.date = DayObject.valid_date;
    this.description = `Low of ${DayObject.low_temp}, high of ${DayObject.max_temp} with ${DayObject.weather.description}`;
    //this.lon = CityObject.lon;
    //this.lat = CityObject.lat;
  }
}

async function getWeather(request, response, next){
  //console.log(request.query);
  try{
    let latitude = request.query.lat;
    let longitude = request.query.lon;
    //let searchCity = request.query.search;

    //console.log(`${latitude}, ${longitude}`);

    let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&units=I&days=3&lat=${latitude}&lon=${longitude}`;

    //let reqCity = data.find(search => search.city_name===searchCity);
    //console.log(weatherUrl);
    let x = await axios.get(weatherUrl);
    //console.log(x.data);
    let arr = x.data.data.map(day => {
      let forecast = new Forecast(day);
      return forecast;
    });
    //let selectedCity = new Forecast(reqCity);
    response.send(arr);
  } catch (error){
    next(error);
  }
}

module.exports = getWeather;
