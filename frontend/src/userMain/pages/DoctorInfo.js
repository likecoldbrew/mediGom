import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import QuickMenu from "../components/QuickMenu";
import SubCategories from "../components/SubCategory";
import ChatBot from "../components/ChatBot";
import axios from "axios";

const DoctorInfo = () => {
    const {subcategory} = useParams(); // URL에서 subcategory 가져오기
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
         axios.get('/api/doctorsInfo').then((response) => {
                setDoctors(response.data); // 가져온 데이터를 상태에 저장
        }).catch((error) => {
                console.error('Error fetching doctor info:', error);
        })
    }, []);
    console.log("닥터정보",doctors);

    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            <SubCategories/>
            <div className=" container mx-auto px-4 py-8 flex flex-grow">
                <main className="flex-grow pr-8 ">
                    <div className="flex-col min-h-full space-y-4 items-center justify-center">
                        {doctors.length > 0 ? ( // 데이터가 있을 때만 표시
                            doctors.map((doctor, index) => (
                                <div key={index} className="bg-white p-4 rounded shadow">
                                    <h2 className="text-xl font-semibold mt-4">{doctor.user_name}</h2> {/* 의사 이름 */}
                                    <p className="text-gray-600">진료과: {doctor.department_name}</p> {/* 진료과 */}
                                    <p className="text-gray-600">진료분야: {doctor.treatments.join(', ')}</p> {/* 진료 분야 */}
                                </div>
                            ))
                        ) : (
                            <p>Loading...</p> // 로딩 중일 때 표시
                        )}
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
