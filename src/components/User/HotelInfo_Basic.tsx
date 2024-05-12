import { hotelInfo_BasicProps } from "../../Types/app";
import StarRating from "./StarRating";

function HotelInfo_Basic(props: hotelInfo_BasicProps) {
    return (
        <div className="hotelInfoContainer">
            <div className="hotelImage">
                <img src={props.hotelInfo.imageUrl} alt={`View of ${props.hotelInfo.hotelName}`} />
            </div>
            <div className="hotelDetails">
                <h3 className="heading">{props.hotelInfo.hotelName}</h3>
                <div className="detailItem">
                    <strong>Location:</strong> {props.hotelInfo.location}
                </div>
                <div className="detailItem">
                    <strong>Description:</strong> {props.hotelInfo.description}
                </div>
                <div className="detailItem">
                    <strong>Star Rating:</strong>
                    <StarRating stars={props.hotelInfo.starRating} />
                </div>
                <div className="detailItem">
                    <strong>Available Rooms:</strong> {props.hotelInfo.availableRooms}
                </div>
                <ul className="amenitiesList">
                    {props.hotelInfo.amenities.map((amenity, index) => (
                        <li key={index}>
                            <strong>{amenity.name}:</strong> {amenity.description}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default HotelInfo_Basic;
