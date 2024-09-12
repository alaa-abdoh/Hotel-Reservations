import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Hotel_RoomSection from './Hotel_RoomSection';
import { hotelCriteria_admin } from '../../../Types/app';
import Loader from '../../../components/Loader';
import useHandleUnauthorized from '../../../components/UseHandleUnauthorized';

function Hotels_RoomsSection(){
    const [hotels, setHotels] = useState<hotelCriteria_admin[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const handleUnauthorized = useHandleUnauthorized();

    useEffect(() => {
        async function getHotels() {
            try {
                setIsLoading(true);
                const response = await axios.get(
                    'https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/hotels',
                    { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } }
                );
                setHotels(response.data);
                setIsLoading(false);
            } catch (error: any) {
                if (error.response.status === 401) {
                    handleUnauthorized()
                }
            }
        }
        getHotels();
    }, []);

    return (
        <div className="hotels_roomsSection">
            <div className="content">
                {isLoading ? <Loader /> : hotels.map((hotel) => (
                    <Hotel_RoomSection hotel={hotel} key={hotel.id} />
                ))}
            </div>
        </div>
    );
}
export default Hotels_RoomsSection;