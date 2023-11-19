import {Link} from "react-router-dom";
import './Navigation.css'

const Navigation  = () => {
return(
    <div>
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="List">List</Link>
                </li>
            </ul>
        </nav>
        <h1>Card Rewards Calculator</h1>
    </div>
)

}

export default Navigation;