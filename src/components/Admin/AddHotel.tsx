import { useNavigate } from "react-router-dom";
import Loader from "../Loader"
import { useEffect, useState } from "react";
import axios from "axios";
import { showPopup } from "../ShowPopup";
import { cityCriteria } from "../../Types/app";

function AddHotel(){
    const [name, setName]= useState();
    const [description, setDescription]= useState();
    const [rating, setRating]= useState<number>()
    const [roomType, setRoomType]= useState()
    const [isLoading, setIsLoading]= useState(false)
    const [cities, setCities]= useState([])
    const [city, setCity]= useState("")
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
                    navigate("/");
                    localStorage.removeItem("authToken")
                    localStorage.removeItem("userType")
                    window.history.replaceState(null, '', '/');
                }
            }
        }
        getCities();
    }, [])
    async function handleSubmit(e:any){
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await axios.post(`
            No API to Add new Hotel`,{
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
                navigate("/");
                localStorage.removeItem("authToken")
                localStorage.removeItem("userType")
                window.history.replaceState(null, '', '/');
            }
            else{
                showPopup("Failed", "No API yet to Add new Hotel", "error", false);
                setIsLoading(false)
            }
        }
    }

    return(
        <div className="addHotel">
            <h2 className="heading">Add Hotel</h2>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <input required type="text" placeholder="Hotel Name" onChange={(e:any)=>setName(e.target.value)} />
                <textarea required rows={10} placeholder="Hotel Description" onChange={(e:any)=> setDescription(e.target.value)}/>
                <div style={{margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", width:"180px"}}>
                    <label style={{marginRight:"20px"}} htmlFor="stars">Stars</label>
                    <select id="stars" onChange={(e:any)=>setRating(e.target.value)}value={rating}>
                    <optgroup label="Rating">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </optgroup>
                    </select>
                </div>
                <div style={{margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", width:"180px"}}>
                    <label style={{marginRight:"20px"}} htmlFor="city">City</label>
                    <select id="city" onChange={(e:any)=>setCity(e.target.value)}value={city}>
                    <optgroup label="Cities">
                        {
                            cities.map((city: cityCriteria)=> <option key={city.id} value={city.name}>{city.name}</option> )
                        }
                    </optgroup>
                    </select>
                </div>
                <div style={{margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", width:"180px"}}>
                    <label style={{marginRight:"20px"}} htmlFor="type">Type</label>
                    <select id="type" onChange={(e:any)=>setRoomType(e.target.value)}value={roomType}>
                    <optgroup label="Type">
                        <option value="Double">Double</option>
                        <option value="King Suite">King Suite</option>
                        <option value="Cabin">Cabin</option>
                        <option value="Ocean View">Ocean View</option>
                    </optgroup>
                    </select>
                </div>
                <input className="btn" type="submit" value="Add" />
            </form>
            {isLoading && <Loader/>}
        </div>
    )
}
export default AddHotel