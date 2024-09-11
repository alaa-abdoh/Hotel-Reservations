import FeaturesDeals from "./FeaturesDeals";
import Intro from "./Intro";
import RecentlyVisited from "./RecentlyVisted";
import SearchBar from "./SearchBar";
import TrendingDestinations from "./TrendingDestinations";

function UserIndex(){
    return(
       <>
        <Intro/>
        <SearchBar/>
        <FeaturesDeals/>
        <RecentlyVisited/>
        <TrendingDestinations/>
       </>
    )
}
export default UserIndex;