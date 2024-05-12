import { useParams } from "react-router-dom";

function HotelInfo(){
    const {hotelID} =useParams();
    return(
        <p>Hotel Page {hotelID} </p>
    )
}
export default HotelInfo;