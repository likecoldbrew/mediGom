import React, { useState } from "react";
import SidebarAndNavbar from "./components/sideBar";
import Home from "./pages/home";

function Admin () {
    const [activePage, setActivePage] = useState('home'); // 기본 페이지 설정

    // 페이지 렌더링 함수
    const renderPage = () => {
        switch (activePage) {
            case 'home':
                return <Home />;
            // 다른 페이지 컴포넌트 추가
            default:
                return <div>페이지를 선택하세요.</div>;
        }
    };

    return (
        <>
            {/* SidebarAndNavbar에 setActivePage, renderPage를 props로 전달 */}
            <SidebarAndNavbar setActivePage={setActivePage} renderPage={renderPage} />
        </>
    )
}

export default Admin;