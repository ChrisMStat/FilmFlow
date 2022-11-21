import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original/";
var result;
function test(id) {
  result = id;

  var email = localStorage.getItem("email"); //retrieve the email from local storage
  var password = localStorage.getItem("password"); //retrieve the password from local storage
  var movID = id;

  fetch("http://localhost:5000/addmovie", {
    method: "POST",
    crossDomain: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      email,
      password,
      movID,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "userRegister");
    });
}

function SearchRow({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      console.log(request.data.results);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  //console.log(movies);

  return (
    <div className="row">
      <div className="category-header">
        <h2>{title}</h2>
      </div>

      <div className="row__posters">
        {movies.map((movie, index) => (
          <>
            <img
              className={`row__poster  ${isLargeRow && "row__posterLarge"}`}
              key={movie.id}
              src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
              onClick={() => test(movie)}
            ></img>
          </>
        ))}
      </div>
    </div>
  );
}

export default SearchRow;
