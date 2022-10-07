import React, {useEffect, useState} from 'react';
import './App.css';
import MovieBox from './MovieBox';

function App() {

  const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=518f0cf1333524b8ec0f30f5fb0b224a";

  const [movies, setMovies] = useState([]);
 // const example = ["one", "two"];

 useEffect(() => {
  
  fetch(API_URL)
  .then((res) => res.json())
  .then(data=>{
    console.log(data);
    setMovies(data.results);
  })

 },[])


  return (
    <div>
      {movies.map((movieReq) =>
      <MovieBox key={movieReq.id} {...movieReq}/>)}
    </div>
  );
}

export default App;
