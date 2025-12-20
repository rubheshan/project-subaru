import "../css/SideBar.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SideCarList from "./SideCarList.jsx";


function SideBar({isOpen,setIsOpen}){

    const navigate = useNavigate();

    const [isShown, setIsShown] = useState(false);
    
    function handleClick(){
        navigate(`/About`);
    }


    return(
        <div className={`sidebar ${isOpen ?  "open" : ""}`}>
            <div>
                <button className="close-button" onClick={() => setIsOpen(false)}>Close</button>
            </div>

            <div className="sidebar-content">
                <button onClick={handleClick}>About</button>
                <button
                    onMouseEnter={() => setIsShown(true)}
                    onMouseLeave={() => setIsShown(false)}
                >Models</button>
                <SideCarList isShown={isShown} setIsShown={setIsShown}/>

            </div>

        </div>
    );
}

export default SideBar;