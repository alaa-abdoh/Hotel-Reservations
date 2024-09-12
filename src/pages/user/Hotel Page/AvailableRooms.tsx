import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import HotelRoom from "./HotelRoom";
import { availableRoomsProps, roomCriteria } from "../../../Types/app";
import Loader from "../../../components/Loader";
import useHandleUnauthorized from "../../../components/HandleUnauthorized";

function AvailableRooms(props: availableRoomsProps){
    const [rooms, setRooms]= useState([])
    const [isLoading, setIsLoading]= useState<boolean>(false)
    const navigate= useNavigate();

    function extractDate(): string {
        const date: Date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${month}/${day}/${year}`;
      }
      function extractTomorowDate(): string {
        const date: Date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate() + 1;
        return `${month}/${day}/${year}`;
      }

    useEffect(() => {
        async function hotelInformation() {
            try {
                setIsLoading(true);
                const response = await axios.get(`
                https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/hotels/${props.hotelId}/rooms?checkInDate=${extractDate()}&checkOutDate=${extractTomorowDate()}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
                });
                setRooms(response.data);
                setIsLoading(false);
            } catch (error: any) {
                if (error.response.status === 401) {
                    useHandleUnauthorized();
                }
            }
        }
        hotelInformation();
    }, [])

    return(
        <div className="availableRooms">
            <div className="container">
                <h3 className="heading">Available Rooms</h3>
                <div className="content">
                    {
                        isLoading? <Loader/>: rooms.map((room:roomCriteria)=> <HotelRoom key={room.roomId} room={room}/>)
                    }
                </div>
            </div>
        </div>
    )
}
export default AvailableRooms;