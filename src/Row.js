import React, {useState, useEffect, Component} from 'react';
import axios from './axios';
import './Row.css';

const base_url = "https://image.tmdb.org/t/p/original/";
var result;
function test(id){
   result = id;

   console.log(result);

};


function Row({title, fetchUrl, isLargeRow}){
    const[movies, setMovies] = useState([]);

    useEffect(()=>{

        async function fetchData(){
            const request = await axios.get(fetchUrl);
            console.log(request.data.results);
           // console.log('pizza testing');
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    },[fetchUrl]);
//console.log('hello');

    console.log(movies);
   
    return (
        <div className="row">
            <div className = "category-header">
            <h2>{title}</h2>
            </div>
            
            <div className="row__posters">
                {movies.map((movie,index)=>(
                    <><img className={`row__poster  ${isLargeRow && "row__posterLarge"}`}
                        key={movie.id}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name}
                        onClick = {() => test(movie.id)}
                        >
                        
                        </img>



                        </>
                        
                ))}
            </div>
        </div>
        
    )
    
}
export default Row