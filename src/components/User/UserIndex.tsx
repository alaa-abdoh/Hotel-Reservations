import FeaturesDeals from "./FeaturesDeals";
import Intro from "./Intro";
import RecentlyVisted from "./RecentlyVisted";
import SearchBar from "./SearchBar";
import TrendingDestinations from "./TrendingDestinations";

function UserIndex(){
    return(
       <>
        <Intro/>
        <SearchBar/>
        <FeaturesDeals/>
        <RecentlyVisted/>
        <TrendingDestinations/>
       </>
    )
}
export default UserIndex;