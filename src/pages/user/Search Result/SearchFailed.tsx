import { Link } from "react-router-dom";
import { searchFailedProps } from "../../../Types/app";

function SearchFailed(props: searchFailedProps){
    return(
        <div className="noHotelsFound">
            <h2>No properties found in {props.place}</h2>
            <p>There are no matching properties for your search criteria. Try updating your search.</p>
            <Link to="/home" className="btn">Update Search </Link>
            <span>Tip: You can write Ramallah for example</span>
        </div> 
    )
}
export default SearchFailed