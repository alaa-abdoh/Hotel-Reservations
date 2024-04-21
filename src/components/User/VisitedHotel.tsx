import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCity, faMoneyCheckDollar, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { VisitedHotelProps } from "../../Types/app";
import StarRating from './StarRating';

function VisitedHotel(props: VisitedHotelProps){
    return(
        <div className="hotel">
            <div className="img">
                <img src={props.hotel.thumbnailUrl} alt="hotel img" />
            </div>
            <div className="info">
                <h3>{props.hotel.hotelName}</h3>
                <div className="city">
                    <span> <FontAwesomeIcon icon={faCity} className='icon' />City :</span>
                    <span>{props.hotel.cityName}</span>
                </div>
                <div className="price">
                    <div>
                        <span> <FontAwesomeIcon icon={faMoneyCheckDollar} className='icon' />lower :</span>
                        <span>{props.hotel.priceLowerBound}</span>
                    </div>
                    <div>
                        <span> <FontAwesomeIcon icon={faMoneyCheckDollar} className='icon' />Upper :</span>
                        <span>{props.hotel.priceLowerBound}</span>
                    </div>
                </div>
                <div className="date">
                    <span> <FontAwesomeIcon icon={faCalendarDays} className='icon' />Date :</span>
                    <span>{props.hotel.visitDate.slice(0, props.hotel.visitDate.indexOf("T"))}</span>
                </div>
                <span>Rating :<StarRating stars={props.hotel.starRating} /></span>
            </div>
        </div>
    )
}
export default VisitedHotel;