import { trendHotelProbs } from "../../../Types/app";

function TrendHotel(props: trendHotelProbs){
    return(
        <div className="hotel">
            <div className="img">
                <img src={props.hotelInfo.thumbnailUrl} alt="City pic"/>
            </div>
            <h3>{props.hotelInfo.cityName }</h3>
        </div>
    )
}
export default TrendHotel;