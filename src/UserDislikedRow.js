/* Row for the user's disliked movie; displayed on their profile page */

import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

var movie_all;
var movie_id = -1;
var movie_description = "";
var movie_name = "";
var movie_poster = "";
const API_IMG = "https://image.tmdb.org/t/p/w200";

export default class UserRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      show: false,
    };
  }

  componentDidMount() {
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
        this.setState({ movies: data.data.badmovID });
      });
  }

  RemoveMovie(id) {
    console.log(id);
    var email = localStorage.getItem("email"); //retrieve the email from local storage
    var password = localStorage.getItem("password"); //retrieve the password from local storage
    var movID = id;

    fetch("http://localhost:5555/deletebadmovie", {
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
        console.log(data, "badmoviedelete");
        this.componentDidMount();
      });
    window.location.reload();       //refreshes page on click, its kind of obnoxious but it does function properly
  }

  render() {
    const base_url = "https://image.tmdb.org/t/p/original/";
    var title = "Disliked Movies";
    var isLargeRow = false;

    return (
      <div className="row">
        <div className="category-header">
          <h2>{title}</h2>
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
                  movie_all = movie;
                  movie_id = movie.id;
                  movie_name = movie.title;
                  movie_description = movie.overview;
                  movie_poster = API_IMG + movie.poster_path;
                  this.setState({
                    movies: this.state.movies,
                    show: !this.state.show,
                  });
                }}
              ></img>
            </>
          ))}
        </div>

        <Modal className="movie_popup" show={this.state.show}>
          <Modal.Header closeButton>
            <Modal.Title>
              {" "}
              <b>{movie_name}</b>{" "}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img className="img-fluid"
                 key = {movie_id}
                 src={movie_poster}
                 alt = {movie_name}
            >

            </img>
            <p>
              <b> Synopsis: </b> {movie_description}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() =>
                this.setState({
                  movies: this.state.movies,
                  show: !this.state.show,
                })
              }
            >
              Close
            </Button>
            <Button
              variant="warning"
              onClick={() => {
                this.RemoveMovie(movie_all);
                this.setState({
                  movies: this.state.movies,
                  show: !this.state.show,
                });
              }}
            >
              Undislike
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
