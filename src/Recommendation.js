import React, { useState, useEffect, Component } from "react";
import "./Row.css";
import Button from "react-bootstrap/Button";

var GenreVariable = 0;
var randompage = Math.floor(Math.random() * 500);
var liked_movies = [];
//var movie;
const base_url = "https://image.tmdb.org/t/p/original/";
const API_IMG = "https://image.tmdb.org/t/p/w300";


export default function (props) {

    const [movies, setMovies] = useState([]);

    function getLikedMovies() {
        fetch("http://localhost:5555/userInfo", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                token: localStorage.getItem("token"),
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, "userInfo");
                liked_movies = data.data.movID;

                countGenres();
            });
    }

    // counting genre occurrence
    function countGenres()
    {
        const genres = [];

        for (var i = 0; i < liked_movies.length; i++) {
            var list = liked_movies[i].genre_ids;
            for (var j = 0; j < list.length; j++) {

                var existingValue = genres.find(function (value) {
                    return value.label === list[j]
                });

                if (!existingValue) {
                    genres.push(
                        {
                            label: list[j],
                            count: 1
                        }
                    );
                } else {
                    existingValue.count++;
                }
            }
        }

        // finding most frequent genre
        let highest_genre = genres[0];
        for (var i = 0; i < genres.length; i++)
        {
            for (var j = i; j < genres.length; j++)
            {
                if (genres[j].count > genres[i].count && genres[j].count > highest_genre.count)
                {
                    highest_genre = genres[j];
                }
            }
        }

        // setting genre variable to most favored genre
        GenreVariable = highest_genre.label;
        console.log("MOST LIKED GENRE ID: " + GenreVariable);

        // url for random recommended movies within the favored genre
        let fetchUrl=`https://api.themoviedb.org/3/discover/movie?api_key=518f0cf1333524b8ec0f30f5fb0b224a&include_adult=false&with_genres=${GenreVariable}&page=${randompage}`;
        fetch(fetchUrl).then(res => res.json()).then(data => {

            //movies = data.results;
            setMovies(data.results);

        })
    }

/*
    return
    {
        <div>
            <h1 className="testing_page">TESTING</h1>
            {movies.slice(0,1).map((movie, index) => (
             <h1>
                 {movie.title}
             </h1>
            ))}
        </div>
    }
*/
        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);

        getLikedMovies();

        /*
        useEffect(() => {
            async function fetchData() {
                const request = await axios.get(fetchUrl);
                console.log(request.data.results);
                setMovies(request.data.results);
                return request;
            }
            fetchData();
        }, [fetchUrl]);

        console.log(movies);
         */
    var isLargeRow = true;

        return (
            <div className="movie_rec_entire">
                {movies.slice(0,1).map((movie, index) => (
                    <>
                        <h1 className="rec_title">{movie.title}</h1>
                        <div className="rec_grid">
                        <img
                            className="rec_poster"
                            //key={movie.id}
                            src={`${API_IMG}${movie.poster_path}`}
                            //alt={movie.name}
                        ></img>
                        <body className="rec_synopsis">
                        <h1 className="rec_synopsis_header">Synopsis:</h1>
                        <p className="rec_text">{movie.overview}</p>
                        <button className="next_rec"  onClick={() => {window.location.reload()}}>
                            Next Movie
                        </button>
                        </body>
                        </div>
                    </>
                ))}
            </div>
        );
}