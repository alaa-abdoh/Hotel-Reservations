import axios from "axios";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { MyJwtPayload, visitedHotel } from "../../Types/app";
import { useNavigate } from "react-router-dom";
import VisitedHotel from "./VisitedHotel";

function RecentlyVisited() {
    const [Visted, setVisited] = useState([])
    const navigate= useNavigate();

    useEffect(() => {
        async function visitedHotels() {
            try {
                const authToken = localStorage.getItem('authToken');
                if (authToken) {
                    const decodedToken = jwtDecode<MyJwtPayload>(authToken);
                    const userId = decodedToken.user_id;
                    const response = await axios.get(`https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/home/users/${userId}/recent-hotels`, {
                        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
                    });
                    setVisited(response.data);
                    console.log(response.data)
                }
            } catch (error:any) {
                if(error.response.status === 401){
                    navigate("/");
                    localStorage.removeItem("authToken")
                    localStorage.removeItem("userType")
                    window.history.replaceState(null, '', '/');
                }
            }
        }
        visitedHotels();
    }, [])
    return (
        <div className="RecentlyVisited">
            <div className="container">
                <h2 className="heading">Recently Visited Hotels</h2>
                <div className="hotels">
                    {
                        Visted.map((hotel: visitedHotel)=> <VisitedHotel hotel={hotel} key={hotel.hotelId} /> )
                    }
                </div>
            </div>
        </div>
    )
}
export default RecentlyVisited;