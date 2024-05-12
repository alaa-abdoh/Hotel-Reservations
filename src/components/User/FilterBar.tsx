import { useEffect, useState } from "react";
import { filterBarProps, searchedHotel } from "../../Types/app";
import PriceFilter from "./PriceFilter";
import StarFilter from "./StarFilter";
import RoomTypeFilter from "./RoomTypeFilter";

function FilterBar(props: filterBarProps) {
  const [selectedStars, setSelectedStars] = useState(0);
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(550);
  const [selectedRoomType, setSelectedRoomType] = useState("");

  useEffect(() => {
    props.setHotels(
      props.originalHotels.filter(
        (hotel) =>
          hotel.roomPrice >= minPrice &&
          hotel.roomPrice <= maxPrice &&
          hotel.starRating >= selectedStars &&
          (selectedRoomType === "" || hotel.roomType === selectedRoomType)
      )
    );
  }, [selectedStars, minPrice, maxPrice, selectedRoomType]);

  return (
    <div className="filterBar">
      <h3>Filter</h3>
      <div className="fiterBy">
        <PriceFilter
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
        />
        <StarFilter
          selectedStars={selectedStars}
          setSelectedStars={setSelectedStars}
        />
        <RoomTypeFilter selectedRoomType={selectedRoomType} setSelectedRoomType={setSelectedRoomType} />
      </div>
    </div>
  );
}
export default FilterBar;
