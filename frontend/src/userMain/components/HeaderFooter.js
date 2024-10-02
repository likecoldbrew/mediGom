import React, {useState} from 'react';
import "../style/index.css";
import {Link} from "react-router-dom";

const categories = [
    {name: '진료안내', subcategories: [{name:'의료진', path:'1001' },{name:'진료과', path:'1002'} , {name: '병원안내', path:'1003'}]},
    {name: '진료예약', subcategories: [{name:'온라인 예약', path:'2001' },{name:'AI 추천', path:'2002'}]},
    {name: '증명서 발급', subcategories: [{name: '증명서 발급', path: '3001'}]},
    {name: '커뮤니티', subcategories: [{name:'진료 후기', path: '4001' },{name:'공지사항', path: '4002'} ,{name:'FAQ', path: '4003' }, {name:'1대1 문의', path: '4004'} ]},
    {name: '마이페이지', subcategories: [{name:'내 정보', path: '5001'}, {name:'처방 내역', path: '5002'}, {name:'증명서 신청 내역', path: '5003'} ]},
];

const HospitalHomepage: React.FC = () => {
    /* 하위 카테고리 보여주기 위한 변수*/
    const [hoveredCategory, setHoveredCategory] = useState(null);

    return (
        <div>
            <div className="flex flex-col min-h-screen  bg-sky-50">
                <header className="bg-white shadow-sm">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl font-bold text-sky-700">병원 로고</h1>
                            <nav className="hidden md:flex space-x-10">
                                <button className="text-sky-600 hover:text-sky-800  hover:font-bold transition-colors">로그인</button>
                                <button className="text-sky-600 hover:text-sky-800  hover:font-bold  transition-colors">회원가입</button>
                            </nav>
                        </div>
                        <nav className="mt-4 flex flex-wrap justify-center gap-28">
                            {categories.map((category, index) => (
                                <div
                                    key={index}
                                    className="relative"
                                    onMouseEnter={() => setHoveredCategory(category.name)}
                                >
                                    <span
                                        className="cursor-pointer text-sky-600 text-xl  hover:font-bold hover:text-sky-800 transition-colors ">{category.name}</span>
                                    {hoveredCategory === category.name && (
                                        <div className="absolute left-0 mt-2 w-48 bg-white border rounded shadow-lg"
                                             onMouseEnter={() => setHoveredCategory(category.name)} onMouseLeave={() => setHoveredCategory(null)}>
                                            {category.subcategories.map((sub) => (
                                                <Link key={sub.path} to={`/${sub.path}`}>
                                                <div className="px-4 py-2 hover:bg-sky-100 cursor-pointer hover:font-bold ">
                                                    {sub.name}
                                                </div>
                                                </Link>
                                            ))}
                                        </div>
                                        )}
                                </div>
                            ))}
                        </nav>
                    </div>
                </header>
                <main className="flex-grow h-3/5 container mx-auto px-4 py-8">
                </main>
                <footer className=" h-1/10 bottom-0 bg-sky-100 text-sky-800 py-4 mt-1">
                    <div className=" container mx-auto px-4 text-center">
                        <p>주소주소 대표전화: 1555-1234</p>
                        <p>&copy; 2024 mediGom. All rights reserved.</p>

                    </div>
                </footer>
            </div>
        </div>
    );
};

export default HospitalHomepage;