import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import { hotelLocationProps } from '../../Types/app';
import L from 'leaflet';

function HotelLocation(props: hotelLocationProps) {
   const mapRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
    if (mapRef.current !== null) {
        const map = L.map(mapRef.current).setView([props.latitude, props.longitude], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        const marker = L.marker([props.latitude, props.longitude]).addTo(map);
        marker.bindPopup('Here is the hotel!').openPopup();
        return () => {
            map.remove();
        };
    }
}, [props.latitude, props.longitude]);

return (
    <div className="map">
        <div className="container">
            <h3 className="heading">Location on Map</h3>
            <div ref={mapRef} style={{ height: '500px', width: '100%' }} />
        </div>
    </div>
);
}
export default HotelLocation;
