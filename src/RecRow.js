import React, {Component, useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

var movie_all;
var movie_id = -1;
var movie_description = "";
var movie_name = "";
var movie_poster = "";
const API_IMG = "https://image.tmdb.org/t/p/w200";

var GenreVariable = 0;
var randompage = Math.floor(Math.random() * 500);
var liked_movies = [];

export default class RecRow extends Component {
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
                liked_movies = data.data.movID;

                this.countGenres();
            });
    }

    // counting genre occurrence
    countGenres()
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

            this.setState({ movies: data.results });
        })
    }

    AddLikedMovie(id) {
        var email = localStorage.getItem("email"); //retrieve the email from local storage
        var password = localStorage.getItem("password"); //retrieve the password from local storage
        var movID = id;

        fetch("http://localhost:5555/addmovie", {
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
        window.location.reload();       //refreshes page on click, its kind of obnoxious but it does function properly
    }

    AddDislikedMovie(id) {
        var email = localStorage.getItem("email"); //retrieve the email from local storage
        var password = localStorage.getItem("password"); //retrieve the password from local storage
        var movID = id;

        fetch("http://localhost:5555/addbadmovie", {
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
        window.location.reload();       //refreshes page on click, its kind of obnoxious but it does function properly
    }

    render() {
        const base_url = "https://image.tmdb.org/t/p/original/";
        var title = "Recommended Movies";
        var isLargeRow = true;

        return (
            <div className="row">
                <div className="category-header">
                    <h2>{title}</h2>
                </div>

                <div className="row__posters">
                    {this.state.movies.slice(0,3).map((movie, index) => (
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
                        <Modal.Title> <b>{movie_name}</b> </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img className = "img-fluid" src = {movie_poster}></img>
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
                                this.AddDislikedMovie(movie_all);
                                this.setState({
                                    movies: this.state.movies,
                                    show: !this.state.show,
                                });
                            }}
                        >
                            Dislike
                        </Button>
                        <Button
                            variant="info"
                            onClick={() => {
                                this.AddLikedMovie(movie_all);
                                this.setState({
                                    movies: this.state.movies,
                                    show: !this.state.show,
                                });
                            }}
                        >
                            Like
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
