import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faListUl } from '@fortawesome/free-solid-svg-icons';

function Header(){
    const [isMenuCollapse, setIsMenuCollapse] = useState<Boolean>(true);
    function handleLogOut(){
        localStorage.removeItem("authToken")
        localStorage.removeItem("userType")
        window.history.replaceState(null, '', '/');
    }

    return (
        <header>
            <div className="container">
                <Link to='./'>TravelNest</Link>
                <FontAwesomeIcon icon={faListUl} className="listIcon" onClick={()=>setIsMenuCollapse(!isMenuCollapse)}/>
                <nav style={{top: isMenuCollapse ? "-1000%" : "100%"}}>
                    <a href="#">Featured Deals</a>
                    <a href="#">Recently Visited</a>
                    <a href="#">Trending </a>
                    <Link to="/home/cart"><FontAwesomeIcon icon={faCartShopping}/></Link> 
                </nav>
                <Link to='/' onClick={handleLogOut}>logout</Link>
            </div>
        </header>
    )
}
export default Header;