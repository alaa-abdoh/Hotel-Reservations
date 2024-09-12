import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Room from "./Room";
import { hotelProps, roomCriteria } from "../../../Types/app";
import StarRating from "../../../components/StarRating";
import Loader from "../../../components/Loader";
import useHandleUnauthorized from "../../../components/HandleUnauthorized";


function Hotel_RoomSection(props: hotelProps) {
  const [isRoomsVisible, setIsRoomsVisible] = useState(false);
  const [rooms, setRooms] = useState<roomCriteria[]>([]);
  const [isLoadingRooms, setIsLoadingRooms] = useState(false);
  const navigate = useNavigate();

  const handleHotelClick = async () => {
    if (!isRoomsVisible) {
      try {
        setIsLoadingRooms(true);
        const response = await axios.get(
          `https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/hotels/${props.hotel.id}/rooms?checkInDate=22&checkOutDate=33`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        setRooms(response.data);
        setIsLoadingRooms(false);
      } catch (error: any) {
        if (error.response.status === 401) {
          useHandleUnauthorized()
        }
      }
    }
    setIsRoomsVisible(!isRoomsVisible);
  };

  return (
    <div className="hotel" onClick={handleHotelClick}>
      <div className="details">
        <span>{props.hotel.id}</span>
        <span>{props.hotel.name}</span>
        <span>
          <StarRating stars={props.hotel.starRating} />
        </span>
      </div>
      {isLoadingRooms && <Loader />}
      {isRoomsVisible && (<>
          <h3 className="heading">Hotel's Room</h3>
        <div className="rooms">
          {rooms.map((room) => (
            <Room room={room} key={room.roomId} hotelID={props.hotel.id} />
          ))}
        </div>
        </>)}
    </div>
  );
}
export default Hotel_RoomSection;
