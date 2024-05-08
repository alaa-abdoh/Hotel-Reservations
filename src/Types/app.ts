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
    hotels:searchedHotel[];
}
export type searchHotelsProps={
    hotels:searchedHotel[];
}
export type searchHotelProps={
    hotel:searchedHotel;
}