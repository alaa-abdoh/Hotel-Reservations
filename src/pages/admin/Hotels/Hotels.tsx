import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Hotel from "./Hotel";
import { hotelCriteria_admin } from "../../../Types/app";
import Loader from "../../../components/Loader";
import handleUnauthorized from "../../../components/HandleUnauthorized";

function Hotels(){
    const [hotels, setHotels]= useState([])
    const [isLoading, setIsLoading]= useState(false)
    const navigate= useNavigate();

    useEffect(() => {
        async function getHotels() {
            try {
                setIsLoading(true);
                const response = await axios.get(`
                https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/hotels`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
                });
                setHotels(response.data);
                setIsLoading(false);
            } catch (error: any) {
                if (error.response.status === 401) {
                    handleUnauthorized();
                }
            }
        }
        getHotels();
    }, [])

    return(
        <div className="hotels">
            <h2 className="heading">Manage Hotels</h2>
            <Link to="addHotel" className="btn">Add Hotel</Link>
            <div className="content">
                {
                    isLoading? <Loader/> : hotels.map((hotel: hotelCriteria_admin)=> <Hotel hotel={hotel} key={hotel.id}/>)
                }
            </div>
        </div>
    )
}
export default Hotels