import React, {useEffect} from "react";
const { kakao } = window;

const Map=()=>{

        useEffect(() => {
            const container = document.getElementById('map'); // DOM element for the map
            const options = {
                center: new kakao.maps.LatLng(33.450701, 126.570667), // Coordinates for the center of the map
                level: 3
            };
            const map = new kakao.maps.Map(container, options); // Create and display the map
        }, []);

        return (
            <div id="map" style={{
                width: '500px',
                height: '500px'
            }}></div>
        );
    }
export default Map;