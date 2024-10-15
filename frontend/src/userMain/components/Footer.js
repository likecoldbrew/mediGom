import React, { useEffect, useState } from "react";
import "../style/tailwind.css";

const Footer = () => {
  const [hospital, setHospital] = useState([]);

  // API 호출
  useEffect(() => {
    fetchHospital();
  }, []);

  //병원 정보
  const fetchHospital = async () => {
    try {
      const response = await fetch("/api/hospital/all");
      const data = await response.json();
      setHospital(data);
    } catch (error) {
      console.error("Error fetching doctor info:", error);
    }
  };

  return (
    <footer className=" bg-sky-100 text-sky-800 py-4 mt-1">
      <div className="container mx-auto px-4 flex items-center justify-center">
        <img src="/images/userMain/logo.png" className="h-24 mr-4" alt="logo" />
        <div className="text-center">
          {hospital.length > 0 ? (
            <p className="inline-block mr-3">
              주소 :
              <span className="font-bold inline">
                {hospital[0].hospitalAdd}
              </span>
            </p>
          ) : (
            <p>병원 정보가 없습니다.</p>
          )}
          {hospital.length > 0 ? (
            <p className="inline-block">
              대표 전화번호 :
              <span className="font-bold">{hospital[0].huntingLine}</span>
            </p>
          ) : (
            <p>병원 정보가 없습니다.</p>
          )}
          <p>&copy; 2024 mediGom. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
