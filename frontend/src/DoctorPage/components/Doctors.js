import React, { useState, useEffect } from 'react';
import {
    Calendar,
    FileText,
    Folder,
    Users,
    Mail,
    Map,
    PieChart,
    Settings,
    File,
    Anchor,
    User
} from 'react-feather';




const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

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

    const toggleDropdown = (key: string) => {
        setActiveDropdown(activeDropdown === key ? null : key);
    };

    const menuItems = [
        { key: 'dashboard', icon: <User size={20} />, label: '환자관리', dropdown: ['Lorem ipsum', 'ipsum dolor', 'dolor ipsum', 'amet consectetur', 'ipsum dolor sit'] },
        { key: 'fileManager', icon: <Folder size={20} />, label: '예약확인' },
        { key: 'calendar', icon: <Calendar size={20} />, label: '증명서 발급', dropdown: ['Lorem ipsum', 'ipsum dolor', 'dolor ipsum', 'amet consectetur', 'ipsum dolor sit'] },
        { key: 'mailbox', icon: <Mail size={20} />, label: '입원 신청', dropdown: ['Lorem ipsum', 'ipsum dolor', 'dolor ipsum', 'amet consectetur', 'ipsum dolor sit'] },
        { key: 'ecommerce', icon: <Calendar size={20} />, label: '휴무 신청', dropdown: ['Lorem ipsum', 'ipsum dolor', 'dolor ipsum', 'amet consectetur', 'ipsum dolor sit'] },
        { key: 'projects', icon: <Anchor size={20} />, label: '마이페이지', dropdown: ['Lorem ipsum', 'ipsum dolor', 'dolor ipsum', 'amet consectetur', 'ipsum dolor sit'] },
        { key: 'settings', icon: <Settings size={20} />, label: 'Settings' },
        { key: 'components', icon: <Anchor size={20} />, label: 'Components', dropdown: ['Lorem ipsum', 'ipsum dolor', 'dolor ipsum', 'amet consectetur', 'ipsum dolor sit'] },
        { key: 'charts', icon: <Anchor size={20} />, label: 'Charts', dropdown: ['Lorem ipsum', 'ipsum dolor', 'dolor ipsum', 'amet consectetur', 'ipsum dolor sit'] },
        { key: 'maps', icon: <Map size={20} />, label: 'Maps' },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            <aside className={`bg-white  text-black w-64 min-h-screen p-4 ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out fixed left-0 top-0 z-50`}>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                        <img
                            className="w-10 h-10 rounded-full mr-3"
                            src="https://uniim1.shutterfly.com/ng/services/mediarender/THISLIFE/021036514417/media/23148907008/medium/1501685726/enhance"
                            alt="User avatar"
                        />
                        <div>
                            <h2 className="text-lg font-semibold">Jone Doe</h2>
                            <p className="text-xs text-gray-500">Administrator</p>
                        </div>
                    </div>
                    <button onClick={toggleSidebar} className="md:hidden">
                        <FileText size={24} />
                    </button>
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full px-3 py-2 text-sm text-gray-100 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                </div>

                <nav>
                    <ul>
                        {menuItems.map((item) => (
                            <li key={item.key} className="mb-2">
                                <button
                                    onClick={() => item.dropdown && toggleDropdown(item.key)}
                                    className="flex items-center w-full px-4 py-2 text-gray-950 hover:bg-gray-700 hover:text-white rounded-md transition-colors duration-200"
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
                                                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-700 hover:text-white rounded-md transition-colors duration-200"
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

            <main className={`flex-1 p-4 ${isOpen ? 'md:ml-64' : ''}`}>
                <button
                    onClick={toggleSidebar}
                    className="fixed top-4 left-4 z-50 md:hidden bg-gray-800 text-white p-2 rounded-md"
                >
                    <FileText size={24} />
                </button>
                <h1 className="text-2xl font-semibold mb-4">Dashboard Content</h1>
                <p>Welcome to your dashboard!</p>
            </main>
        </div>
    );
};

export default Sidebar;