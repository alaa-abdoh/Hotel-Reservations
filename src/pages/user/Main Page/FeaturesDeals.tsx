import axios from "axios";
import { useEffect, useState } from "react";
import Deal from "./Deal";
import { useNavigate } from "react-router-dom";
import { hotelDeal } from "../../../Types/app";
import useHandleUnauthorized from "../../../components/HandleUnauthorized";

function FeaturesDeals(){
    const [deals, setDeals] = useState([]);
    const navigate= useNavigate();

    useEffect(() => {
        async function fetchDeals() {
          try {
            const response = await axios.get("https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/home/featured-deals",{
                headers:{Authorization: `Bearer ${localStorage.getItem('authToken')}` }
            });
            setDeals(response.data);
          } catch (error: any) {
            if(error.response.status === 401){
              useHandleUnauthorized()
          }
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