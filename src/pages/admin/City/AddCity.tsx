import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showPopup } from "../../../components/ShowPopup";
import Loader from "../../../components/Loader";
import handleUnauthorized from "../../../components/HandleUnauthorized";

function AddCity(){
    const[name, setName]= useState("");
    const[description, setDescription]= useState("");
    const [isLoading, setIsLoading]= useState(false)
    const navigate= useNavigate();

    async function handleSubmit(e:any){
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await axios.post(`
            https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/cities`,{
                name:name,
                description:description
            } ,{
                headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
            });
            setIsLoading(false);
            showPopup("Success", "The City Added Successfully","success",false).then((result)=>{
                if(result.isConfirmed)
                    navigate("/Adminhome/cities")
            })
        } catch (error: any) {
            if (error.response.status === 401) {
                handleUnauthorized();
            }
        }
    }
    return(
        <div className="addCity">
            <h2 className="heading">Add City</h2>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <input required type="text" placeholder="City Name" onChange={(e)=>setName(e.target.value)} />
                <textarea required rows={10} placeholder="City Description" onChange={(e)=> setDescription(e.target.value)}/>
                <input className="btn" type="submit" value="Add" />
            </form>
            {isLoading && <Loader/>}
        </div>
    )
}
export default AddCity;