import './App.css';
import CardList from './CardList/CardList';
import Home from './Home';

import {Routes, Route, Outlet, Link, BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
// import './bootstrap.css'
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Contact from "./Contact/Contact";


function App() {

  return (
    <div className="AppContainer">
        <Navbar className = {"App-header"} bg="dark" data-bs-theme="dark" expand="lg" fluid>
            <Container expand = "lg">
                <Navbar.Brand>Where's my money?</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Compare Cards</Nav.Link>
                        <Nav.Link href="/List">Card List</Nav.Link>
                        <Nav.Link href="/Contact">Contact</Nav.Link>
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
                <Route path="/Contact" element={<Contact />} />
            </Routes>
            </div>
            {/*<Background />*/}
        </BrowserRouter>
        <footer className={"App-footer"}>&copy; Martin Szlapa 2023</footer>
    </div>
  );
}

export default App;
