import FilterBar from "./FilterBar";
import SearchHotels from "./SearchHotels";
import SearchFailed from "./SearchFailed";
import { searchSuccessProps } from "../../../Types/app";

function SearchSuccess(props: searchSuccessProps){
    return(
        <div className="content">
            <FilterBar hotels={props.hotels} setHotels={props.setHotels} originalHotels={props.originalHotels}/>
            {
                props.hotels.length == 0 ? <SearchFailed place={props.place}/>
                :
                <SearchHotels hotels={props.hotels} />
            }
        </div>
    )
}
export default SearchSuccess;