import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchSuccess from "./SearchSuccess";
import Loader from "../Loader";
import { searchedHotel } from "../../Types/app";

function SearchResult(){
    const [hotels, setHotels]= useState<searchedHotel[]>([]);
    const [originalHotels, setOriginalHotels] = useState<searchedHotel[]>([]);// To use In filter
    const location = useLocation();
    const navigate= useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        async function searchedHotels() {
            try {
                setIsLoading(true);
                const response = await axios.get(`
                https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/home/search?city=${location.state.place}&numberOfRooms=${location.state.reserve.rooms}
                &adults=${location.state.reserve.adults}&children=${location.state.reserve.children}
                `, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
                });
                setHotels(response.data);
                setOriginalHotels(response.data)
                setIsLoading(false);
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
   
    return isLoading ? <Loader/> : (
        <div className="searchResult">
            <div className="container">
                <h3 className="heading">{location.state.place}: {hotels.length} properties found</h3>        
                <SearchSuccess hotels={hotels} setHotels={setHotels} originalHotels={originalHotels} place={location.state.place} />
            </div>
         </div>
    )
}
export default SearchResult;