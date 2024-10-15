import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import {
    Calendar,
    FileText,
    Folder,
    Mail,
    PieChart,
    Settings,
    User,
    FolderPlus,
    LogOut,
    Smile,
} from 'react-feather';
import { MessageSquare, Bell, Menu } from 'lucide-react';

const SidebarAndNavbar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const [category, setCategory] = useState([]);

    // API 호출
    useEffect(() => {
        fetchCategory();
    }, []);

    const fetchCategory = async () => {
        try {
            const response = await fetch('/api/category/admin'); // Spring Boot 서버에서 데이터 가져오기
            const data = await response.json();
            setCategory(data); // 상태 업데이트
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // 처음 로드될 때 한 번 실행

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => setIsOpen(!isOpen);  // 사이드바 토글

    const toggleDropdown = (key) => {
        setActiveDropdown(activeDropdown === key ? null : key);  // 드롭다운 메뉴 토글
    };

    // 아이콘 배열 (카테고리와 순서를 맞춰서 배치)
    const icons = [
        <User size={20} />,         // 회원 관리
        <Calendar size={20} />,     // 일정 관리
        <FileText size={20} />,     // 입원 승인
        <FolderPlus size={20} />,   // 식단 등록
        <PieChart size={20} />,     // 카테고리 관리
        <Settings size={20} />      // 사이트 관리
        // 필요한 만큼 아이콘 추가
    ];

    // 카테고리를 기반으로 동적 메뉴 생성
    const menuItems = category.map((item, index) => ({
        key: String(index + 1), // 고유 키 값 (index를 문자열로 변환)
        icon: icons[index] || <Folder size={20} />, // 아이콘 배열에서 가져오고, 없으면 기본 아이콘 사용
        label: item.name, // 카테고리 이름 사용
        dropdown: item.subcategories || [], // 서브 카테고리 목록 (서버에서 받아온 데이터에 따라)
        url: item.urlName
    }));

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* 사이드 바 */}
            <aside className={`bg-white text-black w-64 min-h-screen p-4
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                 transition-transform duration-300 ease-in-out fixed left-0 top-0 z-50`}>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                        <Smile size={24} className="w-10 h-10 rounded-full mr-3 "/>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">관리자</h2>
                            <p className="text-xs text-gray-500">히히</p>
                        </div>
                    </div>
                    <button className="relative hover:text-blue-400 transition-colors">
                        <LogOut className="w-6 h-6"/>
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
                        {menuItems.map((menuItem) => (
                            <li key={menuItem.key} className="mb-2">
                                {menuItem.dropdown.length > 0 ? (
                                    // 드롭다운이 있는 경우 버튼으로 토글
                                    <button
                                        onClick={() => toggleDropdown(menuItem.key)}
                                        className="flex items-center w-full px-4 py-2 text-blue-900 hover:bg-blue-500 hover:text-white rounded-md transition-colors duration-200"
                                    >
                                        {menuItem.icon}
                                        <span className="ml-3">{menuItem.label}</span>
                                        <svg
                                            className={`ml-auto h-5 w-5 transform ${
                                                activeDropdown === menuItem.key ? 'rotate-180' : ''
                                            } transition-transform duration-200`}
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                ) : (
                                    // 드롭다운이 없는 경우 바로 링크
                                    <Link
                                        to={`list/${menuItem.urlName}`}
                                        className="flex items-center w-full px-4 py-2 text-blue-900 hover:bg-blue-500 hover:text-white rounded-md transition-colors duration-200"
                                    >
                                        {menuItem.icon}
                                        <span className="ml-3">{menuItem.label}</span>
                                    </Link>
                                )}

                                {menuItem.dropdown.length > 0 && activeDropdown === menuItem.key && (
                                    <ul className="pl-4 mt-2 space-y-1">
                                        {menuItem.dropdown.map((subItem, index) => (
                                            <li key={index}>
                                                <Link
                                                    to={`list/${subItem.urlName}`}
                                                    className="block w-full text-left px-4 py-2 text-sm text-blue-800 hover:bg-blue-400 hover:text-white rounded-md transition-colors duration-200"
                                                >
                                                    {subItem.name}
                                                </Link>
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
                <nav className="bg-blue-300 text-white p-4 w-full">
                    <div className="container mx-auto flex justify-between items-center">
                        <div className="flex items-center text-2xl font-bold w-1/4">
                            <img className="mr-3 w-1/12"
                                 src="/images/mediGom_Logo.png"
                            />
                            Medi<span className="text-yellow-300">Gom</span>
                        </div>
                        <div className="flex items-center space-x-6">
                            <div className="relative group">
                                <button className="flex items-center space-x-1 hover:text-yellow-300 transition-colors">
                                    <Mail className="w-6 h-6"/>
                                </button>
                            </div>
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
                    <Outlet /> {/* URL에 따라 렌더링될 콘텐츠 */}
                </div>

            </main>
        </div>
    );
};

export default SidebarAndNavbar;
