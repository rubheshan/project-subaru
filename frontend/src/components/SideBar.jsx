import "../css/SideBar.css";

function SideBar({isOpen,setIsOpen}){
    return(
        <div className={`sidebar ${isOpen ?  "open" : ""}`}>
            <div>
                <button className="close-button" onClick={() => setIsOpen(false)}>Close</button>
            </div>

            <div className="sidebar-content">
                <button>Random Bullshit</button>
                <button>Random Bullshit</button>

                <button>Random Bullshit</button>
                <button>Random Bullshit</button>

            </div>

        </div>
    );
}

export default SideBar;