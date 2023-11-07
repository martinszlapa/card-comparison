import './App.css';
import CardList from './CardList';
import Home from './Home';

import {Routes, Route, Outlet, Link, BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
// import './bootstrap.css'
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";


function App() {

  return (
    <div>
        <Navbar className = {"App-header"} bg="dark" data-bs-theme="dark" expand="lg" fluid>
            <Container expand = "lg">
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
            {/*<Background />*/}
        </BrowserRouter>
        <footer className={"App-footer"}>&copy; Martin Szlapa 2023</footer>
    </div>
  );
}

export default App;
