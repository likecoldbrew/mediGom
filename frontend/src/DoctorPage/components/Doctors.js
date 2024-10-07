import React, { useState, useEffect } from 'react';
import {
    Calendar,
    FileText,
    Folder,
    Users,
    Mail,
    Map,
    PieChart,
    Settings as FeatherSettings,
    File,
    Anchor,
    User,
    Aperture,
    FolderPlus,
    MinusCircle,
    LogIn,
    LogOut,
    UserCheck,
    Smile,
    UserX,
    Wind
} from 'react-feather';
import { Settings, MessageSquare, Bell, Menu } from 'lucide-react';
import {Home} from "../pages/Home";
import Doctors from "../index";
import {UserStateChange} from "../pages/UserStateChange";
import UserManagement from "../pages/UserManagement";

const SidebarAndNavbar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [activePage, setActivePage] = useState('home'); // 현재 활성화된 페이지 상태

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => setIsOpen(!isOpen);

    const toggleDropdown = (key) => {
        setActiveDropdown(activeDropdown === key ? null : key);
    };

    const menuItems = [
        { key: 'dashboard', icon: <User size={20} />, label: '환자관리',page:'userManagement', dropdown: ['환자 전체 목록', '내 환자 확인', '예약 환자 확인', '환자 등록'] },
        { key: 'calendar', icon: <FileText size={20} />, label: '증명서 발급', dropdown: ['Lorem ipsum', 'ipsum dolor', 'dolor ipsum', 'amet consectetur', 'ipsum dolor sit'] },
        { key: 'mailbox', icon: <FolderPlus size={20} />, label: '입원 신청', dropdown: ['Lorem ipsum', 'ipsum dolor', 'dolor ipsum', 'amet consectetur', 'ipsum dolor sit'] },
        { key: 'ecommerce', icon: <Calendar size={20} />, label: '휴무 신청', dropdown: ['Lorem ipsum', 'ipsum dolor', 'dolor ipsum', 'amet consectetur', 'ipsum dolor sit'] },
        { key: 'projects', icon: <FeatherSettings size={20} />, label: '마이페이지', dropdown: ['Lorem ipsum', 'ipsum dolor', 'dolor ipsum', 'amet consectetur', 'ipsum dolor sit'] }
    ];

    // 각 페이지에 해당하는 컴포넌트를 렌더링하는 함수
    const renderPage = () => {
        switch (activePage) {
            case 'home':
                return <Home />;
            case'userManagement':
                return <UserManagement/>;
            case 'userStateChange':
                return <UserStateChange/>;
            // case 'schedule': return <ScheduleComponent />;
            // 다른 페이지 컴포넌트를 추가할 수 있음
            default:
                return <div>페이지를 선택하세요.</div>;
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className={`bg-white text-black w-64 min-h-screen p-4 ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out fixed left-0 top-0 z-50`}>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                        <Smile size={24} className="w-10 h-10 rounded-full mr-3 "/>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">김의사</h2>
                            <p className="text-xs text-gray-500">마취과 치프</p>
                        </div>
                    </div>
                    <button className="relative hover:text-blue-400 transition-colors">
                        <LogOut className="w-6 h-6"/>
                    </button>
                    <button onClick={toggleSidebar} className="md:hidden">
                        <FileText size={24}/>
                    </button>
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full px-3 py-2 text-sm text-black bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <nav>
                    <ul>
                        {menuItems.map((item) => (
                            <li key={item.key} className="mb-2">
                                <button
                                    onClick={() => {setActivePage(item.page); // 클릭 시 페이지 설정
                                        if (item.dropdown) toggleDropdown(item.key);}}
                                    className="flex items-center w-full px-4 py-2 text-blue-900 hover:bg-blue-500 hover:text-white rounded-md transition-colors duration-200"
                                >
                                    {item.icon}
                                    <span className="ml-3">{item.label}</span>
                                    {item.dropdown && (
                                        <svg
                                            className={`ml-auto h-5 w-5 transform ${
                                                activeDropdown === item.key ? 'rotate-180' : ''
                                            } transition-transform duration-200`}
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </button>
                                {item.dropdown && activeDropdown === item.key && (
                                    <ul className="pl-4 mt-2 space-y-1">
                                        {item.dropdown.map((subItem, index) => (
                                            <li key={index}>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-400 hover:text-white rounded-md transition-colors duration-200"
                                                >
                                                    {subItem}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* Main content */}
            {/* Navbar */}
            <main className={`flex-1  ${isOpen ? 'md:ml-64' : ''}`}>
                <nav className="bg-blue-300 text-white p-4  w-full">
                    <div className="container mx-auto flex justify-between items-center">
                        <button>
                        <div className="flex items-center text-2xl font-bold">
                            <img
                                width="40"
                                src="/images/mediGom_Logo.png"/>
                              Medi<span className="text-yellow-300">Gom</span>
                        </div>
                            </button>
                        <div className="flex items-center space-x-6">
                            <div className="relative group">
                                <button className="flex items-center space-x-1 hover:text-yellow-300 transition-colors">
                                    <Wind className="w-6 h-6"/>날씨
                                </button>
                            </div>
                            <button className="relative hover:text-yellow-300 transition-colors">
                                <Mail className="w-6 h-6"/>
                                <span
                                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">10</span>
                            </button>
                            <button className="relative hover:text-yellow-300 transition-colors">
                                <MessageSquare className="w-6 h-6"/>
                                <span
                                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">23</span>
                            </button>
                            <button className="relative hover:text-yellow-300 transition-colors">
                                <Bell className="w-6 h-6"/>
                                <span
                                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">98</span>
                            </button>
                            <button onClick={toggleSidebar}>
                                <Menu className=" relative hover:text-yellow-300 w-6 h-6"/>
                                {/*<FileText size={24}/>*/}
                            </button>

                        </div>
                    </div>
                </nav>

                {/* 동적으로 변경되는 콘텐츠 영역 */}
                <div className="p-4">
                    {renderPage()} {/* 부모 컴포넌트에서 받은 renderPage 호출 */}
                </div>

            </main>
        </div>
    );
};

export default SidebarAndNavbar;
