import { Link } from "react-router-dom";
import { useState } from "react";
import "../css/NavBar.css";
import logo from "/images/home_page/logo.png";
import SideBar from "./SideBar";

function NavBar(){

    const [isOpen, setIsOpen] = useState(false);

    return(
        <nav className="navbar">
            <SideBar isOpen={isOpen} setIsOpen={setIsOpen}/>
            <button className="menu-button" onClick={() => setIsOpen(true)}>
                ☰ Menu
            </button>
            <Link to="/">
               <img src={logo}
                     >
                </img>
            </Link>
        </nav>
    );
}

export default NavBar;