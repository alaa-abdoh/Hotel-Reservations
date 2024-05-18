import { hotelRoomProps } from "../../Types/app"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useCart } from "../Context/CartProvider";
import { showPopup } from "../ShowPopup";

function HotelRoom(props:hotelRoomProps){
    const { addToCart } = useCart();

    function handleAddToCart(){
        showPopup(
            'Confirmation',
            'Are you sure you want to add this room to your cart?',
            'question',
            true, "No"
        ).then((result) => {
            if (result.isConfirmed) {
                addToCart(props.room);
                showPopup("success", "The Room Added Successfully", "success", false)
            }
        });
    }
    return(
        <div className="room">
            <div className="photo">
                <img src={props.room.roomPhotoUrl} alt="The Room view" />
            </div>
            <div className="roomInfo">
                <p>Room Type: <span>{props.room.roomType} Room</span></p>
                <div className="capacity">
                    <p>Room Capacity:</p>
                    <p style={{marginLeft:"20px"}}>Adults: <span>{props.room.capacityOfAdults}</span></p>
                    <p style={{marginLeft:"20px"}}>Children: <span>{props.room.capacityOfChildren}</span></p>
                </div>
                <ul className="amenities">
                    <p>Room Amenities:</p>
                    {
                        props.room.roomAmenities.map((amenity)=>{
                            return <li key={amenity.name}>{amenity.name}: <span>{amenity.description}</span></li>
                        })
                    }
                </ul>
                <p>Is Available ? {props.room.availability?
                    <FontAwesomeIcon icon={faCheck} style={{color:"green"}}/> : 
                    <FontAwesomeIcon icon={faXmark} style={{color:"red"}}/>  
                }</p>
                <p className="price">${props.room.price}</p>
                <button onClick={handleAddToCart} className="btn">Add To Cart</button>
            </div>
        </div>
    )
}
export default HotelRoom