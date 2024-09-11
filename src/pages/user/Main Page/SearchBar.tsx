import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faCalendarDays, faPerson } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import ReserveBox from './ReserveBox';
import Calendars from './Calendars';
import { useNavigate } from 'react-router-dom';
import { Reserve } from '../../../Types/app';

function SearchBar(){
    const [place, setPlace] = useState<String>("");
    const [startDate, setStartDate] = useState<null | Date>(null);
    const [endDate, setEndDate] = useState<null | Date>(null);
    const [showPickerDate, setShowPickerDate]= useState<boolean>(false);
    const [reserve, setReserve] = useState<Reserve>({adults:2, children:0, rooms: 1})
    const [showReserveBox, setShowReserveBox] = useState<boolean>(false);
    const navigateTo = useNavigate();

    function handleSearch(){
        navigateTo('hotelSearch', { state: { place, startDate, endDate, reserve } })
    }

    return(
        <div className="searchBar">
            <div className="container">
                <form>
                    <div>
                        <FontAwesomeIcon icon={faLocationDot} className='icon'/>
                        <input className='place' onChange={(e)=>{setPlace(e.target.value)}} type="text" placeholder='Search for hotels, cities...' />
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faCalendarDays} className='icon'/>
                        <button onClick={(e)=>{e.preventDefault() ;setShowPickerDate(!showPickerDate)}}>
                            <span>start</span>
                            <span>-</span>
                            <span>end</span>
                        </button>
                        {showPickerDate && <Calendars startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />}
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faPerson} className='icon'/>
                        <div className='persons' onClick={()=>{setShowReserveBox(!showReserveBox)}}>             
                            <span>{reserve.adults} {reserve.adults <=1 ? "adult ." : "adults ."}</span> 
                            <span>{reserve.children} {reserve.children <=1 ? "child ." : "children ."}</span> 
                            <span>{reserve.rooms} {reserve.rooms <=1 ? "room" : "rooms"}</span>                         
                        </div>
                        {showReserveBox  && <ReserveBox reserve= {reserve} setReserve={setReserve} />}
                    </div>
                    <button type="button" onClick={handleSearch}>Search</button>
                </form>
            </div>
        </div>
    )
}
export default SearchBar;