import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";

function SideBar(){
    const [showMenu, setShowMenu] = useState<boolean>(false);
    function handleLogOut(){
        localStorage.removeItem("authToken")
        localStorage.removeItem("userType")
        window.location.href = '/'; // Redirect to the Login page
        window.history.replaceState(null, '', '/'); // Replace the current history entry with the root URL
    }

    return(
        <div className="sideBar">
            <Link to="/home"><h2>TravelNest</h2></Link>
            <FontAwesomeIcon
            icon={faList}
            onClick={()=> setShowMenu(!showMenu)}
            className="menu-icon"
            />
            <nav className={`${showMenu ? "show" : "hide"}`}>
                <Link to="/Adminhome/introduction">Main Page</Link>
                <Link to="/Adminhome/cities">Cities</Link>
                <Link to="/Adminhome/hotels">Hotels</Link>
                <Link to="/Adminhome/rooms">rooms</Link>
            </nav>
            <button className="btn" onClick={handleLogOut}>LogOut</button>
        </div>
    )
}
export default SideBar;