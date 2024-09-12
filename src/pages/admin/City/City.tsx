import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { cityProps } from "../../../Types/app";
import { showPopup } from "../../../components/ShowPopup";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import useHandleUnauthorized from "../../../components/HandleUnauthorized";


function City(props: cityProps){
    const [isEditing, setIsEditing]= useState(false);
    const [name, setName]= useState(props.city.name);
    const [description, setDescription]= useState(props.city.description)
    const navigate= useNavigate();

    async function handleSave(){
        try {
            const response = await axios.put(
                `https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/cities/${props.city.id}`,
                {
                    name: name,
                    description: description
                },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
                }
            );
            setIsEditing(false);
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                useHandleUnauthorized();
            } else{
                showPopup("Failed", "There Is error in the API", "error", false)
            }
        }
    }
    function handleDelete(){
        showPopup("Confirmation", "Are You Sure You Want Delete This City ?","question",true,"No").then(async(result)=>{
            if(result.isConfirmed){
                try {
                    const response = await axios.delete(
                        `https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/cities/${props.city.id}`,                       
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
                        showPopup("Failed", "There Is an error in the API", "error", false)
                    }
                }
            }
        })
    }

    return(
        <div className="city">
            <span>{isEditing? <input onChange={(e)=>setName(e.target.value)} type="text" value={name}/>: props.city.name}</span>
            <p title={props.city.description}>{isEditing? <input  onChange={(e)=>setDescription(e.target.value)} type="text" value={description}/>: props.city.description}</p>
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
export default City;