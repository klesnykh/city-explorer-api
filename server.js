'use strict';

const express = require('express');
require('dotenv').config();
let data = require('./data/weather.json');
const cors = require('cors');
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3002;



app.get('/weather', (request, response, next) =>{
  try{
    //let latitude = request.query.lat;
    //let longitude = request.query.lon;
    let searchCity = request.query.search;

    console.log(searchCity);

    let reqCity = data.find(search => search.city_name===searchCity);
    console.log(reqCity);
    let arr = reqCity.data.map(day => {
      let forecast = new Forecast(day);
      return forecast;
    });
    //let selectedCity = new Forecast(reqCity);
    response.send(arr);
  } catch (error){
    next(error);
  }
});

app.get('/', (request, response) => {
  response.send('Hello from our server');
});

app.get('*', (req, res) => {
  res.send('The resource does not exist');
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

class Forecast {
  constructor(DayObject){
    console.log(DayObject);
    //this.name = DayObject.city_name;
    this.date = DayObject.valid_date;
    this.description = `Low of ${DayObject.low_temp}, high of ${DayObject.max_temp} with ${DayObject.weather.description}`;
    //this.lon = CityObject.lon;
    //this.lat = CityObject.lat;
  }
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));
