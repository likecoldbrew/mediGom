import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import QuickMenu from "../components/QuickMenu";
import SubCategories from "../components/SubCategory";
import ChatBot from "../components/ChatBot";
import axios from "axios";

const DoctorInfo = () => {
    const {subcategory} = useParams(); // URL에서 subcategory 가져오기
    // useEffect(() => {
    //     axios.get('/api/users').then((response) => {
    //     })
    // }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            <SubCategories/>
            <div className=" container mx-auto px-4 py-8 flex flex-grow">
                <main className="flex-grow pr-8 ">
                    <div className="flex-col min-h-full space-y-4 items-center justify-center">
                        <div className="bg-white p-4 rounded shadow">
                            <h2 className="text-xl font-semibold mt-4">홍길동 박사</h2>
                            <p className="text-gray-600">내과 전문의</p>
                        </div>
                    </div>
                </main>
                <div className="flex flex-col space-y-4">
                        <QuickMenu/>
                        <ChatBot/>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default DoctorInfo;
