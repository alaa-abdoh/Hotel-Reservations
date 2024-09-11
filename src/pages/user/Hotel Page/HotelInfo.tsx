import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HotelInfo_Basic from "./HotelInfo_Basic";
import Reviews from "./Reviews";
import HotelImages from "./HotelImages";
import { hotelInfo } from "../../../Types/app";
import Loader from "../../../components/Loader";
import handleUnauthorized from "../../../components/HandleUnauthorized";
// Lazy load for the map (HotelLocation component)
const HotelLocation = React.lazy(() => import('./HotelLocation'));
 // Lazy load for AvailableRooms component
const AvailableRooms = React.lazy(() => import('./AvailableRooms'));

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
                    handleUnauthorized();
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
                {hotelInfo ? (
                    <Suspense fallback={<Loader />}>
                        <AvailableRooms hotelId={Number(hotelID)} />
                    </Suspense>
                ) : null}
            </div>
        </div>
    );
}
export default HotelInfo;