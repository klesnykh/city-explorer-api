'use strict';

const express = require('express');
require('dotenv').config();
let data = require('./data/weather.json');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3002;



app.get('/weather', async (request, response, next) =>{
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
});

app.get('/movies', async (request, response, next) =>{
  try{
    let cityName = request.query.search;
    console.log(cityName);
    let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1&include_adult=false&query=${cityName}&year=2020`;

    let x = await axios.get(movieUrl);
    let arr = x.data.results.map(movie => {
      let mov = new Movie(movie);
      return mov;
    });
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
    //console.log(DayObject);
    //this.name = DayObject.city_name;
    this.date = DayObject.valid_date;
    this.description = `Low of ${DayObject.low_temp}, high of ${DayObject.max_temp} with ${DayObject.weather.description}`;
    //this.lon = CityObject.lon;
    //this.lat = CityObject.lat;
  }
}

class Movie{
  constructor(movieObject){
    this.title = movieObject.title;
    this.overview = movieObject.overview;
    this.average_votes = movieObject.vote_average;
    this.total_votes = movieObject.vote_count;
    this.img_url = `https://image.tmdb.org/t/p/w200${movieObject.poster_path}`;
    this.popularity = movieObject.popularity;
    this.released_on = movieObject.release_date;
  }
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));
