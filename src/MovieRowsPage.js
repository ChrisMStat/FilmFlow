import SearchRow from "./SearchRow";
import RandomRow from "./RandomRow";
import Row from "./Row";
import requests from "./requests";
import React, { useEffect, useState } from "react";
import UserRow from "./UserRow";
import UserDislikedRow from "./UserDislikedRow";

export default function (props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const onChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
    console.log(query);
  };

  var GenreVariable = 28;
  var randompage = Math.floor(Math.random() * 500);
  //console.log(randompage);
  return (
    <div>
      <div className="search_bar">
        <h2 className="category-header">Search</h2>
        <input
          type="text"
          placeholder={"Search Movies"}
          value={query}
          onChange={onChange}
          className="search_box"
        />
      </div>
      <RandomRow
        title="Random"
        className="search_row"
        fetchUrl={`/discover/movie?api_key=518f0cf1333524b8ec0f30f5fb0b224a&include_adult=false&with_genres=${GenreVariable}&page=${randompage}`}
        isLargeRow
      />
      <SearchRow
        className="search_row"
        fetchUrl={`/search/movie?api_key=518f0cf1333524b8ec0f30f5fb0b224a&query=${query}`}
        isLargeRow
      />
      <Row title="Trending" fetchUrl={requests.fetchTrending} />
      <Row title="Action" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Romance" fetchUrl={requests.fetchHorrorMovies} />
    </div>
  );
}
