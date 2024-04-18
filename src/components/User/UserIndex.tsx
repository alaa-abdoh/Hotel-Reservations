import FeaturesDeals from "./FeaturesDeals";
import Intro from "./Intro";
import RecentlyVisted from "./RecentlyVisted";
import SearchBar from "./SearchBar";

function UserIndex(){
    return(
       <>
        <Intro/>
        <SearchBar/>
        <FeaturesDeals/>
        <RecentlyVisted/>
       </>
    )
}
export default UserIndex;