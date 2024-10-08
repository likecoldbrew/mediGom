import React, {useEffect} from "react";

const Map=()=>{
    useEffect(() => {
        // Kakao Maps API 스크립트를 동적으로 로드합니다.
        const script = document.createElement('script');
        script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=f2aefecd30330784dcbffde2f442b19d';
        script.async = true;
        script.onload = () => {
            // 지도를 생성합니다.
            const mapContainer = document.getElementById('map'); // 지도를 표시할 div
            const mapOption = {
                center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                level: 3 // 지도의 확대 레벨
            };

            const map = new window.kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

            // 마커가 표시될 위치입니다
            const markerPosition = new window.kakao.maps.LatLng(33.450701, 126.570667);

            // 마커를 생성합니다
            const marker = new window.kakao.maps.Marker({
                position: markerPosition
            });

            // 마커가 지도 위에 표시되도록 설정합니다
            marker.setMap(map);
        };

        document.body.appendChild(script);

        // 컴포넌트가 언마운트될 때 스크립트를 제거합니다.
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div id="map" style={{ width: '100%', height: '350px' }}></div>
    );
};
export default Map;