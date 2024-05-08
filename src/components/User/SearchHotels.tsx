import { searchHotelsProps, searchedHotel } from "../../Types/app";
import SearchHotel from "./SearchHotel";

function SearchHotels(props: searchHotelsProps){
    return(
        <div className="searchedHotels">
            {
                props.hotels.map((hotel: searchedHotel)=> <SearchHotel hotel={hotel}/> )
            }
        </div>
    )
}
export default SearchHotels;