import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { hotelRoomProps } from '../../../Types/app';
import { showPopup } from '../../../components/ShowPopup';
import useHandleUnauthorized from '../../../components/HandleUnauthorized';

function Room(props:hotelRoomProps) {
    const navigate= useNavigate();

    function handleEdit(){
        showPopup("Error", "Sorry there is no API for Edit hotel yet", 'error',false)
    }
    async function handleDelete(){
        showPopup("Confirmation", "Are You Sure You Want Delete This Room ?","question",true,"No").then(async(result)=>{
            if(result.isConfirmed){
                try {
                    const response = await axios.delete(`https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/hotels/${props.hotelID}/rooms/${props.room.roomId}`,
                        {
                            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
                        }
                    );
                    showPopup("Success","Deleted Successfully","success",false)
                } catch (error: any) {
                    if (error.response && error.response.status === 401) {
                        useHandleUnauthorized();
                    }
                }
            }else{
                showPopup("Failed", "There Is error in the API", "error", false)
            }
        })
    }
    return (
        <div className="room">
            <span>{props.room.roomNumber}</span>
            <span>{props.room.roomType}</span>
            <span>{props.room.price}</span>
            <span>{props.room.availability ? 'Available' : 'Unavailable'}</span>
            <span>
                <FontAwesomeIcon icon={faPen} className="roomIcon" onClick={handleEdit} />
                <FontAwesomeIcon icon={faTrash} className="roomIcon" onClick={handleDelete} />
            </span>
        </div>
    );
}

export default Room;
