import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faCalendarDays, faPerson } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import ReserveBox from './ReserveBox';

function SearchBar(){
    const [place, setPlace] = useState<String>("");
    const [reserve, setReserve] = useState<{adults: number, childrens: number, rooms: number}>({adults:1, childrens:0, rooms: 1})
    const [showReserveBox, setShowReserveBox] = useState<boolean>(false);

    return(
        <div className="searchBar">
            <div className="container">
                <form>
                    <div>
                        <FontAwesomeIcon icon={faLocationDot} className='icon'/>
                        <input onChange={(e)=>{setPlace(e.target.value)}} type="text" placeholder='Search for hotels, cities...' />
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faCalendarDays} className='icon'/>
                        <input type="text" placeholder='Where are you going' />
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faPerson} className='icon'/>
                        <div className='persons' onClick={()=>{setShowReserveBox(!showReserveBox)}}>             
                            <span>{reserve.adults} {reserve.adults <=1 ? "adult ." : "adults ."}</span> 
                            <span>{reserve.childrens} {reserve.childrens <=1 ? "children ." : "childrens ."}</span> 
                            <span>{reserve.rooms} {reserve.rooms <=1 ? "room" : "rooms"}</span>                         
                        </div>
                    </div>
                    <input type="submit" value="Search" />
                </form>
            </div>
        </div>
    )
}
export default SearchBar;