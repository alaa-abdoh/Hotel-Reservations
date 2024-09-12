import {  useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { showPopup } from "../../../components/ShowPopup";
import { cityCriteria } from "../../../Types/app";
import Loader from "../../../components/Loader";
import SelectFieldAddHotel from "./SelectFieldAddHotel";
import handleUnauthorized from "../../../components/HandleUnauthorized";
import { Form, Field, Formik } from "formik";
import validationSchema from "./AddHotelValidationSchema";

function AddHotel() {
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

    async function handleSubmit(values: any) {
        console.log(values)
        try {
            setIsLoading(true);
            const response = await axios.post(`
            No API to Add new Hotel`, {
                name: values.name,
                description: values.description
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
            <Formik
                initialValues={{
                    name: '',
                    description: '',
                    rating: 0,
                    roomType: '',
                    city: ''
                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                {({ handleChange, values, errors }) => (
                    <Form>
                        <Field type="text" name="name" placeholder="Hotel Name" onChange={handleChange} />
                        {errors.name  ? <div className="error">{errors.name}</div> : null}
                        <Field as="textarea" name="description" rows={10} placeholder="Hotel Description" onChange={handleChange} />
                        {errors.description ? <div className="error">{errors.description}</div> : null}

                        <div className="selects">
                            <SelectFieldAddHotel
                                label="Stars"
                                name="rating"
                                value={values.rating}
                                onChange={handleChange}
                                options={[
                                    { value: 1, label: '1' },
                                    { value: 2, label: '2' },
                                    { value: 3, label: '3' },
                                    { value: 4, label: '4' },
                                    { value: 5, label: '5' }
                                ]}
                            /> 
                            {errors.rating ? <div className="error">{errors.rating}</div> : null}
                            <SelectFieldAddHotel
                                label="City"
                                name="city"
                                value={values.city}
                                onChange={handleChange}
                                options={cities.map((city: cityCriteria) => ({ value: city.name, label: city.name }))}
                            />
                            {errors.city ? <div className="error">{errors.city}</div> : null}
                            <SelectFieldAddHotel
                                label="Room Type"
                                name="roomType"
                                value={values.roomType}
                                onChange={handleChange}
                                options={[
                                    { value: 'Double', label: 'Double' },
                                    { value: 'King Suite', label: 'King Suite' },
                                    { value: 'Cabin', label: 'Cabin' },
                                    { value: 'Ocean View', label: 'Ocean View' }
                                ]}
                            />
                            {errors.roomType ? <div className="error">{errors.roomType}</div> : null}
                        </div>

                        <input className="btn" type="submit" value="Add" />
                    </Form>
                )}
            </Formik>
            {isLoading && <Loader />}
        </div>
    )
}
export default AddHotel