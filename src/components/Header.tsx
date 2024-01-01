import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListUl } from '@fortawesome/free-solid-svg-icons';

function Header(){
    const [isMenuCollapse, setIsMenuCollapse] = useState<Boolean>(true);

    return (
        <header>
            <div className="container">
                <Link to='./UserIndex'>TravelNest</Link>
                <FontAwesomeIcon icon={faListUl} className="listIcon" onClick={()=>setIsMenuCollapse(!isMenuCollapse)}/>
                <nav style={{top: isMenuCollapse ? "-1000%" : "100%"}}>
                    <a href="#">Featured Deals</a>
                    <a href="#">Recently Visited</a>
                    <a href="#">Trending </a>
                </nav>
                <Link to='/' onClick={()=>console.log("hhhh")}>logout</Link>
            </div>
        </header>
    )
}
export default Header;