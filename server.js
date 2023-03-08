'use strict';

const express = require('express');
require('dotenv').config();
let data = require('./data/weather.json');
const cors = require('cors');
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3002;



app.get('/weather', (request, response) =>{
  //let latitude = request.query.lat;
  //let longitude = request.query.lon;
  let searchCity = request.query.search;

  console.log(searchCity);

  let reqCity = data.find(search => search.city_name===searchCity);
  let selectedCity = new Forecast(reqCity);
  response.send(selectedCity);
});

app.get('/', (request, response) => {
  response.send('Hello from our server');
});

app.get('*', (req, res) => {
  res.send('The resource does not exist');
});

class Forecast {
  constructor(CityObject){
    console.log(CityObject);
    this.name = CityObject.city_name;
    this.date = CityObject.data[0].valid_date;
    this.description = `Low of ${CityObject.data[0].low_temp}, high of ${CityObject.data[0].max_temp} with ${CityObject.data[0].weather.description}`;
  }
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));
