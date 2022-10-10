import React from 'react';

// change the '/w300' to change image size if needed
const API_IMG = "https://image.tmdb.org/t/p/w300/";
const MovieBox = ({title, poster_path, vote_average, release_date,overview}) => {
    return(
        <div className="movies-all">
            <div className ="movie-title">
                <h1>
                    {title}
                </h1>
            </div>
            <div className="movie-img">
                <img src = {API_IMG + poster_path}></img>
            </div>
            <div className="movie-description">
                {overview}
            </div>
        </div>
    )
}
export default MovieBox;