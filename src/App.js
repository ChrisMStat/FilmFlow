import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchRow from "./SearchRow.js";
import Row from "./Row.js";
import MovieBox from "./MovieBox";
import MovieBoxHeader from "./MovieBoxHeader";
import NavMenu from "./NavMenu";
import requests from "./requests";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login.component";
import SignUP from "./signup.component";
import MovieRowsPage from "./MovieRowsPage";
import AboutUs from "./AboutUs";
import SignUp from "./signup.component";

function App() {
  var e;
  var p;
  var m;
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const onChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
    console.log(query);
  };
  return (
    <div className="App">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <NavMenu />
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/movies" element={<MovieRowsPage />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
