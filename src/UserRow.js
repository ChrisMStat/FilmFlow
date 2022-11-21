import React, { Component } from "react";

export default class UserRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:5000/userInfo", {
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
        // console.log(data.data.movID);
        this.setState({ movies: data.data.movID });
      });
  }

  render() {
    const base_url = "https://image.tmdb.org/t/p/original/";
    var title = "User";
    var isLargeRow = false;
    return (
      <div className="row">
        <div className="category-header">
          <h2>USER</h2>
        </div>

        <div className="row__posters">
          {this.state.movies.map((movie, index) => (
            <>
              <img
                className={`row__poster  ${isLargeRow && "row__posterLarge"}`}
                key={movie.id}
                src={`${base_url}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
                onClick={() => {
                  this.componentDidMount();
                }}
              ></img>
            </>
          ))}
        </div>
      </div>
    );
  }
}
