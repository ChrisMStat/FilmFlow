import React, {useEffect, useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieBox from './MovieBox';
import MovieBoxHeader from "./MovieBoxHeader";
import NavMenu from './NavMenu';


function App() {

  const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=518f0cf1333524b8ec0f30f5fb0b224a";

  const [movies, setMovies] = useState([]);
 // const example = ["one", "two"];
// add comment
 useEffect(() => {
  
  fetch(API_URL)
  .then((res) => res.json())
  .then(data=>{
    console.log(data);
    setMovies(data.results);
  })

 },[])

  return (
    <div className = 'container-fluid FilmFlow'>
        <div className = "row">
            <NavMenu />
        </div>
        <div className = "row">
            <MovieBoxHeader header = "Popular Right Now" />
        </div>
      <div className = "row">
      {movies.map((movieReq) =>
      <MovieBox key={movieReq.id} {...movieReq}/>)}
    </div>
        </div>
  );
}

export default App;
