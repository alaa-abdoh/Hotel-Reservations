import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HotelInfo_Basic from "./HotelInfo_Basic";
import Reviews from "./Reviews";
import HotelImages from "./HotelImages";
import AvailableRooms from "./AvailableRooms";
import { hotelInfo } from "../../../Types/app";
import Loader from "../../../components/Loader";
// Lazy load for the map (HotelLocation component)
const HotelLocation = React.lazy(() => import('./HotelLocation'));

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
                {hotelInfo ? (
                    <Suspense fallback={<Loader />}>
                        <HotelLocation latitude={hotelInfo.latitude} longitude={hotelInfo.longitude} />
                    </Suspense>
                ) : null}
                <HotelImages hotelId={Number(hotelID)}/>
                <AvailableRooms hotelId={Number(hotelID)}/>
            </div>
        </div>
    );
}
export default HotelInfo;