'use strict';
const axios = require('axios');

class Movie{
  constructor(movieObject){
    this.title = movieObject.title;
    this.overview = movieObject.overview;
    this.average_votes = movieObject.vote_average;
    this.total_votes = movieObject.vote_count;
    movieObject.poster_path?this.img_url = `https://image.tmdb.org/t/p/w200${movieObject.poster_path}`:this.img_url = false;
    this.popularity = movieObject.popularity;
    this.released_on = movieObject.release_date;
  }
}

async function getMovies(request, response, next){
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
    Promise.resolve().then(() => {
      throw new Error(error.message);
    }).catch(next);
  }
}

module.exports = getMovies;
