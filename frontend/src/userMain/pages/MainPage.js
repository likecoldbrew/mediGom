import React, { useEffect, useState } from "react";
import "../style/tailwind.css";

const HospitalHomepage = () => {
  const imageCount = 4; // 이미지 개수
  const [currentIndex, setCurrentIndex] = useState(0);
  const [content, setContent] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageCount);
    }, 3500); // 3초마다 이미지 변경

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 interval 클리어
  }, []);

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="flex flex-col min-h-screen bg-sky-50">
      <main className="flex-grow container mx-auto px-4 py-8">
        {/*배너*/}
        <div className="relative overflow-hidden h-72"> {/* 높이를 설정 */}
          {Array.from({ length: imageCount }, (_, index) => (
            <div key={index} className="absolute inset-0">
              <img
                src={`/images/banner/${index + 1}.png`} // 동적으로 이미지 경로 생성
                className={`w-full object-cover transition-opacity duration-700 ease-in-out ${
                  currentIndex === index
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-full" // 왼쪽으로 이동
                }`}
                alt={`배너${index + 1}`}
              />
              {/*배너 이미지 클릭 버튼*/}
              <div
                className="absolute mt-2 left-1/2 transform -translate-x-1/2 flex space-x-2"> {/* 버튼을 하단 중앙에 위치 */}
                {Array.from({ length: imageCount }, (_, btnIndex) => (
                  <button
                    key={btnIndex}
                    className={`w-3 h-3 rounded-full ${
                      currentIndex === btnIndex ? "bg-blue-600" : "bg-gray-400"
                    }`}
                    onClick={() => goToImage(btnIndex)} // 클릭 이벤트 작동
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* 둥근 네모 박스 4개 추가 */}
        <div className="grid grid-cols-4 gap-4 ">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="flex items-center justify-center h-32 rounded-lg bg-white shadow-md">
              <p className="text-center text-gray-700">박스 {index + 1}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HospitalHomepage;
