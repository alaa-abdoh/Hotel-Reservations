import axios from "axios";
import { useEffect, useState } from "react";
import Deal from "./Deal";
import { hotelDeal } from "../../Types/app";

function FeaturesDeals(){
    const [deals, setDeals] = useState([]);
    useEffect(() => {
        async function fetchDeals() {
          try {
            const response = await axios.get("https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/home/featured-deals",{
                headers:{Authorization: `Bearer ${localStorage.getItem('authToken')}` }
            });
            setDeals(response.data);
          } catch (error) {
            console.log("Noooooooooooooooooooooooo");
          }
        }
        fetchDeals();
      }, []);

    return(
        <div className="featuredDeals">
          <div className="container">
            <h2 className="heading">Featured Deals</h2>
            <div className="deals">
              {
                deals.map((deal:hotelDeal)=> <Deal key={deal.hotelId} deal= {deal}/>)
              }
            </div>
          </div>
        </div>
    )
}
export default FeaturesDeals;