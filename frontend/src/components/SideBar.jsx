import "../css/SideBar.css";

function SideBar({isOpen,setIsOpen}){
    return(
        <div className={`sidebar ${isOpen ?  "open" : ""}`}>
            <button className="close-button" onClick={() => setIsOpen(false)}>Close</button>
            <p>Sidebar content</p>
            <p>Sidebar content</p>
            <p>Sidebar content</p>

        </div>
    );
}

export default SideBar;