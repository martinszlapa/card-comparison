import './App.css';
import Background from './Background';
import CardList from './CardList';
import Home from './Home';

import {Routes, Route, Outlet, Link, BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import {useState} from "react";
import data from "./utils/Data.json";

function App() {

  return (
    <div>
        <Navbar bg="light" expand="lg" fluid>
            <Container expand = "lg" className="bg-body-tertiary">
                <Navbar.Brand>Credit Card Comparison</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/List">Card List</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <BrowserRouter>
            {/*<div className={"App-header"}>*/}
            {/*    <Navigation />*/}
            {/*</div>*/}
            <div className={"App"}>
            <Routes>
                <Route path="/List" element={<CardList />} />
                <Route path="/" element={
                    <Home />
                } />
            </Routes>
            </div>
            <Background />
        </BrowserRouter>
        <footer className={"App-footer"}>&copy; Martin Szlapa 2023</footer>
    </div>
  );
}

export default App;
