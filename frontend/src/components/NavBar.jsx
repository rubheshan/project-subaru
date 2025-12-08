import { Link } from "react-router-dom";
import "../css/NavBar.css";


function NavBar(){
    return(
        <nav className="navbar">
            <div className="brand-logo">
                <Link to="/">Subaru</Link>
            </div>

            <div>
                <Link to="/Cars" className="navbar-link">Cars</Link>
                <Link to="/News" className="navbar-link">News</Link>
                <Link to="/About" className="navbar-link">About</Link>

            </div>
        </nav>
    );
}

export default NavBar;