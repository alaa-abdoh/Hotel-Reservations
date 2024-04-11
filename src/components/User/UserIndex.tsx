import FeaturesDeals from "./FeaturesDeals";
import Intro from "./Intro";
import SearchBar from "./SearchBar";

function UserIndex(){
    return(
       <>
        <Intro/>
        <SearchBar/>
        <FeaturesDeals/>
       </>
    )
}
export default UserIndex;