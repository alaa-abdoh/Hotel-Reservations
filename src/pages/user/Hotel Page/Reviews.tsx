import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { review, reviewsProps } from "../../../Types/app";
import useHandleUnauthorized from "../../../components/HandleUnauthorized";

function Reviews(props: reviewsProps){
    const [reviews, setReviews]= useState<review[]>([]);
    const navigate= useNavigate();
    useEffect(() => {
        async function hotelReviews() {
            try {
                const response = await axios.get(`https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/hotels/${props.hotelId}/reviews`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
                });
                setReviews(response.data);
            } catch (error: any) {
                if (error.response.status === 401) {
                    useHandleUnauthorized()
                }
            }
        }
        hotelReviews();
    }, [])
    return (
        <div className="reviews">
            <h3 className="heading">Guest Reviews</h3>
            <div className="review-container">
                {reviews.length ? reviews.map((review) => (
                    <div key={review.reviewId} className="review-card">
                        <div className="review-header">
                            <h4>{review.customerName}</h4>
                            <span>{`Rating: ${review.rating}/5`}</span>
                        </div>
                        <div className="review-body">
                            <p>{review.description}</p>
                        </div>
                    </div>
                )) : <p>No reviews available.</p>}
            </div>
        </div>
    );
}
export default Reviews;