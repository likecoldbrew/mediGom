import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const PatientList = () => {
    const [patients, setPatients] = useState([]);

    // API 호출
    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const response = await fetch('/api/users/patient'); // Spring Boot 서버에서 데이터 가져오기
            const data = await response.json();
            setPatients(data); // 상태 업데이트
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    return (
        <div>
            <h1>Home Page</h1>
            <p>Welcome to the Home page!</p>
        </div>
    );
};
export default PatientList;