import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader";
import HotelInfo_Basic from "./HotelInfo_Basic";
import { hotelInfo } from "../../Types/app";
import Reviews from "./Reviews";

function HotelInfo(){
    const {hotelID} =useParams();
    const [hotelInfo, setHotelInfo]= useState<hotelInfo>()
    const [isLoading, setIsLoading]= useState<boolean>(false)
    const navigate= useNavigate();

    useEffect(() => {
        async function hotelInformation() {
            try {
                setIsLoading(true);
                const response = await axios.get(`
                https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/hotels/${hotelID}?includeRooms=true`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
                });
                setHotelInfo(response.data);
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
        hotelInformation();
    }, [])

    return (
        isLoading ? <Loader /> :
        <div className="hotelInfo">
            <div className="container">
                {hotelInfo ? <HotelInfo_Basic hotelInfo={hotelInfo} /> : null}
                <Reviews hotelId={Number(hotelID)}/>
            </div>
        </div>
    );
}
export default HotelInfo;