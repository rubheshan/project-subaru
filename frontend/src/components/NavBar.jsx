import { Link } from "react-router-dom";
import "../css/NavBar.css";
import logo from "../assets/images/home_page/logo.png";

function NavBar(){
    return(
        <nav className="navbar">
                <Link to="/">
                    <img src={logo}
                         >
                    </img>
                </Link>
        </nav>
    );
}

export default NavBar;