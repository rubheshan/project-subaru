import "../css/SideBar.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SideCarList from "./SideCarList.jsx";


function SideBar({isOpen,setIsOpen}){

    const navigate = useNavigate();
    const [isShown, setIsShown] = useState(false);
    
    // 1. Navigate to About
    function handleClick(){
        setIsOpen(false);
        setIsShown(false);
        navigate(`/About`);
    }

    // 2. NEW: Navigate to Compare
    function handleCompareClick(){
        setIsOpen(false);
        setIsShown(false); // Close the car list if it was open
        navigate(`/compare`);
    }

    // 3. Toggle the "Models" dropdown
    function handleModelClick(){
        if(isShown){
            setIsShown(false);
        } else{
            setIsShown(true);
        }
    }

    function closeSidebar(){
        setIsOpen(false);
        setIsShown(false);
    }

    return(
        <div className={`sidebar ${isOpen ?  "open" : ""}`}>
            <div className="sidebar-content">
                <button onClick={() => closeSidebar()}>Close</button>

                <button onClick={handleClick}>About</button>
                
                <button onClick={handleCompareClick}>Compare</button>

                <button onClick={handleModelClick}>Models</button>
                
                <SideCarList isShown={isShown} onLinkClick={closeSidebar} />
            </div>
        </div>
    );
}

export default SideBar;