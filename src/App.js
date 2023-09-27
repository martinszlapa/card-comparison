import './App.css';
import CardChart from './CardChart';
import Background from './Background';
import CardList from './CardList';
import {Routes, Route, Outlet, Link, BrowserRouter} from "react-router-dom";
import Navigation from "./Navigation";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path="/List" element={<CardList />} />
                <Route path="/" element={<CardChart />} />
            </Routes>
            <Background />
        </BrowserRouter>
        <footer>&copy; Martin Szlapa 2023</footer>
    </div>
  );
}

export default App;
