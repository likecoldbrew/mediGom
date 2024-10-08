import React from 'react';
import '../style/tailwind.css';

const Footer = () => {
    return (
        <footer className=" bg-sky-100 text-sky-800 py-4 mt-1">
            <div className="container mx-auto px-4 flex items-center justify-center">
                <img src="/images/userMain/logo.png" className="h-24 mr-4" alt="logo"/>
                <div className="text-center">
                    <p>주소주소 대표전화: 1555-1234</p>
                    <p>&copy; 2024 mediGom. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;