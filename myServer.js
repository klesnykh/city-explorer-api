'use strict';

const express = require('express');
require('dotenv').config();
//let data = require('./data/weather.json');
const cors = require('cors');
//const axios = require('axios');
const getWeather = require('./myWeather');
const getMovies = require('./movies');
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3002;



app.get('/weather', getWeather);

app.get('/movies', getMovies);

app.get('/', (request, response) => {
  response.send('Hello from our server');
});

app.get('*', (req, res) => {
  res.send('The resource does not exist');
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
