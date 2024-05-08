import FilterBar from "./FilterBar";
import SearchHotels from "./SearchHotels";
import { searchSuccessProps } from "../../Types/app";

function SearchSuccess(props: searchSuccessProps){
    return(
        <div className="content">
            <FilterBar/>
            <SearchHotels hotels={props.hotels} />
        </div>
    )
}
export default SearchSuccess;