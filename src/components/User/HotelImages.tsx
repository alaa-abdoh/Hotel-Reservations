import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { hotelImagesProps, hotelImg } from "../../Types/app";
import Loader from "../Loader";

function HotelImages(props: hotelImagesProps){
    const [images, setImages]= useState([]);
    const [isLoading, setIsLoading]= useState(false);
    const navigate= useNavigate();
        useEffect(() => {
        async function imagesFetch() {
            try {
                setIsLoading(true);
                const response = await axios.get(`
                https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/hotels/${props.hotelId}/gallery`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
                });
                setImages(response.data);
                setIsLoading(false);
            } catch (error: any) {
                if (error.response.status === 401) {
                    navigate("/");
                    localStorage.removeItem("authToken")
                    localStorage.removeItem("userType")
                    window.history.replaceState(null, '', '/');
                }
            }
        }
        imagesFetch();
    }, [])
    return(
        <div className="hotelImages">
            <div className="container">
                <h3 className="heading">Hotel Images</h3>
                <div className="content">
                    {
                        isLoading? <Loader/> : images.map((img:hotelImg)=><img alt="Hotel View" key={img.id} src={img.url}/> )   
                    }
                </div>
            </div>
        </div>
    )
}
export default HotelImages;