//code referenced from https://react-bootstrap.github.io/components/navbar/#color-schemes and further edited

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import React, {useState} from "react";
import Col from "react-bootstrap/Col";

import requests from './requests';


function NavMenu() {
    const[query, setQuery]= useState("");
    const[results,setResults]= useState([]);

const onChange = e => {
    e.preventDefault();
    setQuery(e.target.value);
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=518f0cf1333524b8ec0f30f5fb0b224a&query=${e.target.value}`
    ).then((res)=> res.json()).then((data)=>{
        if(!data.errors){
            setResults(data.results);
            console.log(data.results);
        }else{
            setResults([]);
        }
    });
}
    return (
        <div>
            {[false].map((expand) => (
                <Navbar key={expand} bg="black" variant="dark" sticky='top' expand={expand} className="mb-3">

                    <Container fluid className="nav_bar_entire">
                        <Col className="nav_button_col">
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} className="nav_button_box"/>
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="start"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`} className="menu_header">
                                    FilmFlow
                                </Offcanvas.Title>

                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav.Link href="/recommendation" className="menu_movie_button">
                                    <button className="recommend_button">Recommend Movie</button>
                                </Nav.Link>
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    <Nav.Link href="/movies">Home</Nav.Link>
                                    <Nav.Link href="/sign-up">Sign In</Nav.Link>
                                    <Nav.Link href="/profile">Profile</Nav.Link>
                                    <Nav.Link href="/about">About Us</Nav.Link>
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                        </Col>
                        <Col className="nav_title_col">
                            <h2 className="nav_title">FilmFlow</h2>
                        </Col>
                        <Col className="right_col">

                        </Col>
                    </Container>
                </Navbar>


            ))}
            
        </div>
    );
}
export default NavMenu;