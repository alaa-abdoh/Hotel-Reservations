import { Link } from "react-router-dom";
import { searchHotelProps } from "../../../Types/app";
import StarRating from "../../../components/StarRating";


function SearchHotel(props: searchHotelProps){
    return(
        <div className="hotel">
            <div className="roomImg">
                <img src={props.hotel.roomPhotoUrl} alt="The room view" />
            </div>
            <div className="info">
                <h3>{props.hotel.hotelName}</h3>
                <p><span>Location:</span> {props.hotel.cityName}</p>
                <div>
                    <p>The hotel has this list of amenities</p>
                    <ul>
                        {
                            props.hotel.amenities.map((amenity)=>{
                                return <li key={amenity.name}><span>{amenity.name}</span>: {amenity.description}</li>
                            })
                        }
                    </ul>
                </div>
                <p style={{marginBottom:0}}><span>Price:</span> ${props.hotel.roomPrice}</p>
                <p style={{marginBottom:0}}><span>Room Type:</span> {props.hotel.roomType}</p>
                <StarRating stars={props.hotel.starRating}/>
                <Link to={`/home/hotelSearch/hotels/${props.hotel.hotelId}`} className="btn">Booking it</Link>
            </div>
        </div>
    )
}
export default SearchHotel;