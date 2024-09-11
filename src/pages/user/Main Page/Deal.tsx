import StarRating from "../../../components/StarRating";
import { DealProps } from "../../../Types/app";

function Deal(props: DealProps){
    return(
        <div className="deal">
            <div className="img">
                <img src={props.deal.roomPhotoUrl} alt="Room Photo" />
            </div>
            <div className="info">
                <h3>{props.deal.hotelName}</h3>
                <p>{props.deal.title}, {props.deal.cityName}</p>
                <p>{props.deal.description}</p>
                <StarRating stars={props.deal.hotelStarRating}/>
                <span className="orginalPrice">${props.deal.originalRoomPrice}</span>
                <span className="finalPrice">${props.deal.finalPrice}</span>
            </div>
        </div>
    )
}
export default Deal;