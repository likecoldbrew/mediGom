import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import QuickMenu from "../components/QuickMenu";
import SubCategories from "../components/SubCategory";
import ChatBot from "../components/ChatBot";


const HospitalInfo = () => {
    const {subcategory} = useParams(); // URL에서 subcategory 가져오기
    const [hospital, setHospital] = useState([]);


    // API 호출
    useEffect(() => {
        fetchHospital();
    }, []);

    //병원 정보
    const fetchHospital = async () => {
        try {
            const response = await fetch('/api/hospital/all')
            const data = await response.json();
            setHospital(data)
        } catch (error) {
            console.error('Error fetching doctor info:', error);
        }
    }

    // 일정 글자수마다 줄바꿈
    const splitIntoLines = (text, maxLength) => {
        const words = text.split(' ');
        let currentLine = '';
        const lines = [];

        words.forEach(word => {
            if (currentLine.length + word.length + 1 <= maxLength) {
                currentLine += (currentLine.length ? ' ' : '') + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        });

        if (currentLine.length) lines.push(currentLine);
        return lines;
    };

    // 병원 소개 텍스트를 50자로 줄바꿈
    const introText = hospital[0]?.intro ? splitIntoLines(hospital[0].intro, 25) : [];

    return (
        <div className="flex flex-col min-h-screen">
            <SubCategories/>
            <div className=" container mx-auto px-4 py-8 flex flex-grow">
                <main className="flex-grow pr-8 ">
                    <div className="bg-white p-4 border border-blue-300 rounded shadow relative"
                         style={{height: '30%'}}> {/* 부모 div의 높이를 30%로 설정 */}
                        {/* 배경 이미지가 적용된 div */}
                        <div style={{
                            backgroundImage: `url('/images/userMain/logo.png')`,
                            height: '90%', // 부모 div와 높이를 맞춤
                            backgroundSize: 'contain', // 이미지 크기 조정
                            backgroundPosition: 'center', // 중앙에 위치
                            backgroundRepeat: 'no-repeat', // 반복하지 않음
                            opacity: 0.3, // 투명도 설정 (0.0 ~ 1.0 범위)
                            position: 'absolute', // 절대 위치로 설정
                            top: 10,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 0, // 배경 이미지가 다른 내용 아래에 위치하도록 설정
                        }}/>

                        {/* 텍스트 내용 */}
                        <h2 className="text-xl text-center font-bold m-8 relative z-10"> {/* z-index 조정 */}
                            {introText.map((line, index) => (
                                <p key={index} className="text-black mb-2">{line}</p>
                            ))}
                        </h2>
                    </div>
                    <div className="bg-white p-4 border border-blue-300 rounded shadow relative mt-10">



                        <h2 className="text-xl text-center font-bold m-8 relative z-10"> {/* z-index 조정 */}
                            {introText.map((line, index) => (
                                <p key={index} className="text-black mb-2">{line}</p>
                            ))}
                        </h2>
                    </div>
                </main>
                <div className="flex flex-col space-y-4">
                    <QuickMenu/>
                    <ChatBot/>
                </div>
            </div>

        </div>
    );
};

export default HospitalInfo;

