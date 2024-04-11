import { StarRatingProps } from "../../Types/app";

function StarRating(props: StarRatingProps) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <span key={i} className="star" style={{ color: i <= props.stars ? '#ffc107' : '#e4e5e9' }}>
                ★
            </span>
        );
    }

    return <div className="rating">{stars}</div>;
}
export default StarRating;