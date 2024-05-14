// this folder has all types
import { jwtDecode, JwtPayload  } from "jwt-decode";

export type Reserve= {
    adults: number, 
    children: number, 
    rooms: number,
    [key: string]: number; // this line added to make TS allow dynamic access to object property 
}
export type ReserveBoxProps= {
    reserve: Reserve,
    setReserve: React.Dispatch<React.SetStateAction<Reserve>>;
}
export type ReserveBoxContentProps= {
    peopleClassification: string,
    amount: number,
    updateReserveAmount(classification: string, operation: "+" | "-"):void;
}
export type CalendarsProps= {
    startDate: null | Date,
    endDate: null | Date,
    setStartDate: React.Dispatch<React.SetStateAction<null | Date>>,
    setEndDate: React.Dispatch<React.SetStateAction<null | Date>>,
}
export type hotelDeal={
    cityName: String,
    description: String,
    discount: number,
    finalPrice: number,
    hotelId: number,
    hotelName: String,
    hotelStarRating: number,
    originalRoomPrice: number,
    roomPhotoUrl: string,
    title: String,

}
export type DealProps= {
    deal:hotelDeal;
}
export type StarRatingProps={
    stars: number
}
export interface MyJwtPayload extends JwtPayload {
    user_id: string; 
    userType: string;
    family_name: string;
    given_name: string;
}
export type visitedHotel={
    hotelId:number,
    cityName: string,
    hotelName: string,
    priceLowerBound: number,
    priceUpperBound: number,
    starRating: number,
    thumbnailUrl: string,
    visitDate: string
}
export type VisitedHotelProps= {
    hotel: visitedHotel
}
export type trendHotel={
    cityId: number,
    cityName: string,
    countryName: string,
    description: string,
    thumbnailUrl: string
}
export type trendHotelProbs= {
    hotelInfo:trendHotel
}
export type searchFailedProps={
    place: string
}
export type searchedHotel={
    hotelId: number,
    hotelName: string,
    starRating: number,
    latitude: number,
    longitude: number,
    roomPrice: number,
    roomType: string,
    cityName: string,
    roomPhotoUrl: string,
    discount: number,
    amenities: [
      {
        id: number,
        name: string,
        description: string
      },
      {
        id: number,
        name: string,
        description: string
      }
    ]
}
export type searchSuccessProps={
    hotels:searchedHotel[],
    setHotels:React.Dispatch<React.SetStateAction<searchedHotel[]>>,
    originalHotels:searchedHotel[],
    place:string;
}
export type searchHotelsProps={
    hotels:searchedHotel[];
}
export type searchHotelProps={
    hotel:searchedHotel;
}
export type filterBarProps={
    hotels:searchedHotel[];
    setHotels:React.Dispatch<React.SetStateAction<searchedHotel[]>>,
    originalHotels:searchedHotel[];
}
export type priceFilterProps={
    minPrice: number,
    setMinPrice: React.Dispatch<React.SetStateAction<number>>,
    maxPrice: number,
    setMaxPrice: React.Dispatch<React.SetStateAction<number>>;
}
export type starFilterProps={
    selectedStars: number,
    setSelectedStars:  React.Dispatch<React.SetStateAction<number>>;
}
export type roomTypeFilterProps={
    selectedRoomType: string,
    setSelectedRoomType: React.Dispatch<React.SetStateAction<string>>;
}
export type hotelInfo={
    hotelName: string;
    location: string;
    description: string;
    latitude: number;
    longitude: number;
    amenities: { name: string; description: string; }[];
    starRating: number;
    availableRooms: number;
    imageUrl: string;
    cityId: number;    
}
export type hotelInfo_BasicProps={
    hotelInfo: hotelInfo;
}
export type reviewsProps={
    hotelId: number
}
export type review={
    reviewId: number,
    customerName: string,
    rating: number,
    description: string
}
export type hotelLocationProps={
    latitude: number,
    longitude: number; 
}
export type hotelImagesProps={
    hotelId: number
}
export type hotelImg={
    id:number,
    url:string
}
export type availableRoomsProps={
    hotelId: number
}
export type roomCriteria= {
    roomId: number,
    roomNumber: number,
    roomPhotoUrl: string,
    roomType: string,
    capacityOfAdults: number,
    capacityOfChildren: number,
    roomAmenities: [
        {
        name: string,
        description: string
        },
        {
        name: string,
        description: string
        },
        {
        name: string,
        description: string
        }
    ],
    price: number,
    availability: boolean
}
export type hotelRoomProps={
    room: roomCriteria
}