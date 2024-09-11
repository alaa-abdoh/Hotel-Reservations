import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";
import { cityCriteria } from "../../../Types/app";
import City from "./City";
import handleUnauthorized from "../../../components/HandleUnauthorized";


function Cities(){
    const [cities, setCities]= useState([])
    const [isLoading, setIsLoading]= useState(false)
    const navigate= useNavigate();

    useEffect(() => {
        async function getCities() {
            try {
                setIsLoading(true);
                const response = await axios.get(`
                https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/cities`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
                });
                setCities(response.data);
                setIsLoading(false);
            } catch (error: any) {
                if (error.response.status === 401) {
                    handleUnauthorized();
                }
            }
        }
        getCities();
    }, [])

    return(
        <div className="cities">
            <h2 className="heading">Manage Cities</h2>
            <Link to="addCity" className="btn">Add City</Link>
            <div className="content">
                {
                    isLoading? <Loader/> : cities.map((city: cityCriteria)=> <City city={city} key={city.id}/>)
                }
            </div>
        </div>
    )
}
export default Cities;