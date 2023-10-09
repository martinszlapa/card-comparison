import './App.css';
import CardChart from './CardChart';
import Background from './Background';
import CardList from './CardList';
import {Routes, Route, Outlet, Link, BrowserRouter} from "react-router-dom";
import Navigation from "./Navigation";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div>
        <BrowserRouter>
            <div className={"App-header"}>
                <Navigation />
            </div>
            <div className={"App"}>
            <Routes>
                <Route path="/List" element={<CardList />} />
                <Route path="/" element={<CardChart />} />
            </Routes>
            </div>
            <Background />
        </BrowserRouter>
        <footer className={"App-footer"}>&copy; Martin Szlapa 2023</footer>
    </div>
  );
}

export default App;
