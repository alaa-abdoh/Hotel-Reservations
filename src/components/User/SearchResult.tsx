import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchFailed from "./SearchFailed";

function SearchResult(){
    const [hotels, setHotels]= useState([]);
    const location = useLocation();
    const navigate= useNavigate();
    useEffect(() => {
        async function searchedHotels() {
            try {
                const response = await axios.get(`
                https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/home/search?city=${location.state.place}&numberOfRooms=${location.state.reserve.rooms}
                &adults=${location.state.reserve.adults}&children=${location.state.reserve.children}
                `, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
                });
                setHotels(response.data);
                console.log(response.data)
            } catch (error: any) {
                if (error.response.status === 401) {
                    navigate("/");
                    localStorage.removeItem("authToken")
                    localStorage.removeItem("userType")
                    window.history.replaceState(null, '', '/');
                }
            }
        }
        searchedHotels();
    }, [])
    
    return(
        <div className="searchResult">
            <h3 className="heading">{location.state.place}: {hotels.length} properties found</h3>
            {
                hotels.length == 0 ? <SearchFailed place={location.state.place}/>
                :
                <div></div>
            }
        </div>
    )
}
export default SearchResult;