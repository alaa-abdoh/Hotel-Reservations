import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { showPopup } from "../../../components/ShowPopup";
import { cityCriteria } from "../../../Types/app";
import Loader from "../../../components/Loader";
import SelectFieldAddHotel from "./SelectFieldAddHotel";
import handleUnauthorized from "../../../components/HandleUnauthorized";

function AddHotel() {
    const [hotelDetails, setHotelDetails] = useState({
        name: '',
        description: '',
        rating: 0,
        roomType: '',
        city: ''
    });
    const [isLoading, setIsLoading] = useState(false)
    const [cities, setCities] = useState([])
    const navigate = useNavigate();


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
                    handleUnauthorized()
                }
            }
        }
        getCities();
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setHotelDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    async function handleSubmit(e: any) {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await axios.post(`
            No API to Add new Hotel`, {
                name: hotelDetails.name,
                description: hotelDetails.description
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
            });
            setIsLoading(false);
            showPopup("Success", "The City Added Successfully", "success", false).then((result) => {
                if (result.isConfirmed)
                    navigate("/Adminhome/cities")
            })
        } catch (error: any) {
            if (error.response.status === 401) {
                handleUnauthorized()
            }
            else {
                showPopup("Failed", "No API yet to Add new Hotel", "error", false);
                setIsLoading(false)
            }
        }
    }

    return (
        <div className="addHotel">
            <h2 className="heading">Add Hotel</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input required type="text" name="name" placeholder="Hotel Name" onChange={handleChange} />
                <textarea required name="description" rows={10} placeholder="Hotel Description" onChange={handleChange} />
                <div className="selects">
                    <SelectFieldAddHotel onChange={handleChange}  label="Stars" name="rating" value={hotelDetails.rating} options={[
                        { value: 1, label: '1' },
                        { value: 2, label: '2' },
                        { value: 3, label: '3' },
                        { value: 4, label: '4' },
                        { value: 5, label: '5' }
                    ]}/>
                    <SelectFieldAddHotel label="City" name="city" value={hotelDetails.city} onChange={handleChange}
                        options={cities.map((city:cityCriteria) => ({ value: city.name, label: city.name }))}
                    />
                    <SelectFieldAddHotel label="Room Type" name="roomType" value={hotelDetails.roomType} onChange={handleChange}
                        options={[
                            { value: 'Double', label: 'Double' },
                            { value: 'King Suite', label: 'King Suite' },
                            { value: 'Cabin', label: 'Cabin' },
                            { value: 'Ocean View', label: 'Ocean View' }
                        ]}
                    />
                    </div>
                <input className="btn" type="submit" value="Add" />
            </form>
            {isLoading && <Loader />}
        </div>
    )
}
export default AddHotel