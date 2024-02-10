import { useLocation } from "react-router-dom";

function SearchResult(){
    const location = useLocation();
    function x(){
        console.log("$$$$$$$$$$$$$$$$$")
        console.log(location)
        console.log(location.pathname)
        console.log(location.state)
        console.log(location.state.place)
        console.log(location.state.startDate)
        console.log(location.state.endDate)
        console.log(location.state.reserve)
    }
    return(
        <>
            <p>this is search result page</p>
            <button onClick={x}>click</button>
        </>
    )
}
export default SearchResult;