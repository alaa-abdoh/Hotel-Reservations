import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { showPopup } from "../../../components/ShowPopup";
import { cityCriteria } from "../../../Types/app";
import Loader from "../../../components/Loader";


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
                    navigate("/");
                    localStorage.removeItem("authToken")
                    localStorage.removeItem("userType")
                    window.history.replaceState(null, '', '/');
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
                navigate("/");
                localStorage.removeItem("authToken")
                localStorage.removeItem("userType")
                window.history.replaceState(null, '', '/');
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
                <div className="main">
                    <label htmlFor="stars">Stars</label>
                    <select id="stars" name="rating" onChange={handleChange} value={hotelDetails.rating}>
                        <optgroup label="Rating">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </optgroup>
                    </select>
                </div>
                <div className="main">
                    <label htmlFor="city">City</label>
                    <select id="city" name="city" onChange={handleChange} value={hotelDetails.city}>
                        <optgroup label="Cities">
                            {
                                cities.map((city: cityCriteria) => <option key={city.id} value={city.name}>{city.name}</option>)
                            }
                        </optgroup>
                    </select>
                </div>
                <div className="main">
                    <label htmlFor="type">Type</label>
                    <select id="type" name="roomType" onChange={handleChange} value={hotelDetails.roomType}>
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
            {isLoading && <Loader />}
        </div>
    )
}
export default AddHotel