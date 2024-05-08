import { searchHotelProps } from "../../Types/app";
import StarRating from "./StarRating";

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
                <StarRating stars={props.hotel.starRating}/>
            </div>
        </div>
    )
}
export default SearchHotel;