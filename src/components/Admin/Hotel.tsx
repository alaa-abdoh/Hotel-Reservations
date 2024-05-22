import { useState } from "react";
import { hotelProps } from "../../Types/app";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { showPopup } from "../ShowPopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

function Hotel(props:hotelProps){
    const [isEditing, setIsEditing]= useState(false);
    const [name, setName]= useState(props.hotel.name);
    const [description, setDescription]= useState(props.hotel.description);
    const [rating, setRating]= useState<number>(props.hotel.starRating)
    const [roomType, setRoomType]= useState(props.hotel.hotelType)
    const navigate= useNavigate();

    async function handleSave(){
        try {
            const response = await axios.put(
                `https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/hotels/${props.hotel.id}`,
                {
                    name: name,
                    description: description,
                    starRating: rating,
                    hotelType: roomType
                },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
                }
            );
            setIsEditing(false);
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                navigate("/");
                localStorage.removeItem("authToken");
                localStorage.removeItem("userType");
                window.history.replaceState(null, '', '/');
            } else{
                showPopup("Failed", "There Is error in the API", "error", false)
            }
        }
    }
    function handleDelete(){
        showPopup("Confirmation", "Are You Sure You Want Delete This Hotel ?","question",true,"No").then(async(result)=>{
            if(result.isConfirmed){
                try {
                    const response = await axios.delete(
                        `No API from BackEnd to delete Hotel`,
                        {
                            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
                        }
                    );
                    setIsEditing(false);
                } catch (error: any) {
                    if (error.response && error.response.status === 401) {
                        navigate("/");
                        localStorage.removeItem("authToken");
                        localStorage.removeItem("userType");
                        window.history.replaceState(null, '', '/');
                    } else{
                        showPopup("Failed", "No API from BackEnd to delete Hotel", "error", false)
                    }
                }
            }
        })
    }

    return(
        <div className="hotel">
            <span>{isEditing? <input onChange={(e)=>setName(e.target.value)} type="text" value={name}/>: props.hotel.name}</span>
            <p title={props.hotel.description}>{isEditing? <input  onChange={(e)=>setDescription(e.target.value)} type="text" value={description}/>: props.hotel.description}</p>
            <p>{isEditing? <select  onChange={(e:any)=>setRating(e.target.value)}value={rating}>
                <optgroup label="Rating">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </optgroup>
            </select>: props.hotel.starRating}★</p>
            <span>{isEditing? <select onChange={(e:any)=>setRoomType(e.target.value)}value={roomType}>
                <option value="Double">Double</option>
                <option value="King Suite">King Suite</option>
                <option value="Cabin">Cabin</option>
                <option value="Ocean View">Ocean View</option>
            </select>: props.hotel.hotelType}</span>
            <div className="actions">
                {
                    isEditing ? (
                    <>
                        <button className="btn" onClick={()=>setIsEditing(false)}>Cancel</button> 
                        <button onClick={handleSave} className="btn saveEditing">Save</button>
                    </>
                    ):(
                    <>
                        <FontAwesomeIcon icon={faPen} className="adminIcon" onClick={()=>setIsEditing(true)}/>
                        <FontAwesomeIcon icon={faTrash} className="adminIcon" onClick={handleDelete}/>
                    </>
                    )
                }
            </div>
        </div>
    )
}
export default Hotel;