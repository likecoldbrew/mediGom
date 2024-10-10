import React, { useEffect, useState } from 'react';
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";

const PharmacyMap = () => {
    const { kakao } = window;
    const [info, setInfo] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [map, setMap] = useState(null);
    const [hospitalCoords, setHospitalCoords] = useState(null);

    // Fetch hospital data from your API
    const fetchHospitalData = async () => {
        try {
            const response = await fetch('/api/hospital/all');
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            const data = await response.json();
            if (data.length > 0) {
                const address = data[0].hospitalAdd; // Get the address
                await geocodeAddress(address); // Get coordinates for the hospital address
            } else {
                console.error('No hospital data found.');
            }
        } catch (error) {
            console.error('Error fetching hospital data:', error);
        }
    };

    // Geocode the address to get coordinates
    const geocodeAddress = (address) => {
        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(address, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
                const coords = {
                    lat: parseFloat(result[0].y),
                    lng: parseFloat(result[0].x),
                };
                setHospitalCoords(coords);
                if (map) {
                    map.setCenter(coords); // Center the map on the hospital coordinates
                    searchNearbyPharmacies(coords); // Search for nearby pharmacies
                }
            } else {
                console.error('Geocoding failed:', status);
            }
        });
    };

    // Search for nearby pharmacies
    const searchNearbyPharmacies = (coords) => {
        if (!map) return;

        const ps = new kakao.maps.services.Places();
        ps.keywordSearch("근처 약국", (data, status) => {
            if (status === kakao.maps.services.Status.OK) {
                const bounds = new kakao.maps.LatLngBounds();
                let pharmacyMarkers = [];

                for (let i = 0; i < data.length; i++) {
                    const markerPosition = {
                        lat: data[i].y,
                        lng: data[i].x,
                    };
                    pharmacyMarkers.push({
                        position: markerPosition,
                        content: data[i].place_name,
                    });
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                }

                setMarkers(pharmacyMarkers); // Set the markers state
                map.setBounds(bounds); // Adjust map bounds to include markers
            } else {
                console.error('Places search failed:', status);
            }
        });
    };

    // Effect to fetch hospital data when the component mounts
    useEffect(() => {
        fetchHospitalData();
    }, []);

    return (
        <Map
            center={{
                lat: 37.566826,
                lng: 126.9786567,
            }}
            style={{
                width: "80%",
                height: "350px",
            }}
            level={3}
            onCreate={setMap}
        >
            {markers.map((marker) => (
                <MapMarker
                    key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
                    position={marker.position}
                    onClick={() => setInfo(marker)}
                >
                    {info && info.content === marker.content && (
                        <div style={{ color: "#000" }}>{marker.content}</div>
                    )}
                </MapMarker>
            ))}
        </Map>
    );
};

export default PharmacyMap;
