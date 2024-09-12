import * as Yup from "yup";

function validationSchema(){
    return Yup.object({
        name: Yup.string()
            .required('Name is required')
            .matches(/^(?=.*\s).+$/, 'Name must contain at least one space'),
        description: Yup.string()
            .required('Description is required')
            .test('min-words', 'Description must have at least 10 words', (value)=> {
                if (!value) return false; // The case when value is undefined the test is failed 
                return value.split(' ').filter(word => word !== '').length >= 10;
            }),
        rating: Yup.number()
            .required('Rating is required')
            .min(1, 'Rating must be at least 1')
            .max(5, 'Rating cannot be more than 5'),
        roomType: Yup.string().required('Room Type is required'),
        city: Yup.string().required('City is required')
    });
}
export default validationSchema; 