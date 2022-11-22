import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavMenu from "./NavMenu";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Login from "./login.component";
import MovieRowsPage from "./MovieRowsPage";
import AboutUs from "./AboutUs";
import SignUp from "./signup.component";
import UserProfile from "./UserProfile";

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
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/" element={<Navigate to="/sign-up" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
