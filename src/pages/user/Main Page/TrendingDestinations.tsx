import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TrendHotel from "./TrendHotel";
import { trendHotel } from "../../../Types/app";
import useHandleUnauthorized from "../../../components/UseHandleUnauthorized";

function TrendingDestinations() {
    const [trends, setTrends] = useState([])
    const handleUnauthorized = useHandleUnauthorized();

    useEffect(() => {
        async function visitedHotels() {
            try {
                const response = await axios.get(`https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/home/destinations/trending`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
                });
                setTrends(response.data);
            } catch (error: any) {
                if (error.response.status === 401) {
                    handleUnauthorized()
                }
            }
        }
        visitedHotels();
    }, [])

    return (
        <div className="trendingDestinations">
            <div className="container">
                <h2 className="heading">Trending Destinations</h2>
                <div className="hotels">
                    {
                        trends.map((hotel:trendHotel) => <TrendHotel hotelInfo={hotel} key={hotel.cityId} /> )
                    }
                </div>
            </div>
        </div>
    )
}
export default TrendingDestinations;