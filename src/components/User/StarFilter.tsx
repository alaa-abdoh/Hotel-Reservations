import { useState } from 'react';
import { starFilterProps } from "../../Types/app";

function StarFilter(props: starFilterProps){
    const stars = Array.from({ length: 5 }, (ele, index) => index + 1);

    function handleStarClick(star: number) {
      props.setSelectedStars(star);
    };
  
    return (
      <div className='starFilter'>
        <h4>Stars</h4>
        <div>
          {stars.map(star => (
            <span key={star} className="star" style={{ cursor: "pointer",color: star <= props.selectedStars ? '#ffc107' : '#e4e5e9' }} onClick={() => handleStarClick(star)}>
                ★
            </span>
          ))}
        </div>
      </div>
    );
}
export default StarFilter;