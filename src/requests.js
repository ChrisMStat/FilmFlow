/* Used to hold the urls for the tmdb requests for each default genre */

const API_KEY = "518f0cf1333524b8ec0f30f5fb0b224a";

const requests ={
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`

};

export default requests;