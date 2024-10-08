import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import QuickMenu from "../components/QuickMenu";
import SubCategories from "../components/SubCategory";
import ChatBot from "../components/ChatBot";
import axios from "axios";
import debounce from 'lodash.debounce';

const DepartmentInfo = () => {
    const {subcategory} = useParams(); // URL에서 subcategory 가져오기
    const [department, setDepartment] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 추가
    const [loading, setLoading] = useState(false); // 로딩 상태 추가
    const [error, setError] = useState(null); // 에러 상태 추가
    const icon = "🔍";

    // API 호출
    useEffect(() => {
        fetchDepartments();
    }, []);

    //의사 정보 호출 -> 여기서 진료과 진료분야 추출
    const fetchDepartments = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/doctorsInfo/allDepartment');
            const data = await response.json();
            setDepartment(data); // 응답 데이터 설정
        } catch (error) {
            console.error('Error fetching doctor info:', error);
            setError('의사 정보를 가져오는 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    }

    // 검색 함수
    const handleSearch = async (searchValue) => {
        if (searchValue.trim() === '') {
            // 검색어가 비어있으면 전체 의사 목록을 다시 가져옵니다.
            fetchDepartments();
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`/api/doctorsInfo/department?departmentName=${encodeURIComponent(searchValue)}`);
            setDepartment(response.data);
        } catch (error) {
            console.error('Error searching doctor info:', error);
            setError('검색 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };
    // 디바운싱된 검색 함수
    const debouncedSearch = useCallback(
        debounce((value) => {
            handleSearch(value);
        }, 150), // 300ms 지연
        []
    );

    // 입력 변경 핸들러
    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        debouncedSearch(value);
    };

    // 엔터 키 입력 핸들링
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            debouncedSearch.cancel(); // 디바운싱된 호출을 취소
            handleSearch(searchTerm); // 즉시 검색 수행
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <SubCategories/>
            <div className="flex flex-col items-center justify-center mt-8">
                <div className="flex max-w-3xl w-full">
                    <input
                        type="text"
                        className="form-input border rounded-l-md px-4 py-2 w-full"
                        placeholder="찾고 싶은 의료진 이름을 검색해보세요"
                        value={searchTerm}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                    />
                    <button className="bg-sky-50 hover:bg-sky-100 text-white px-4 py-2 rounded-r-md"  onClick={() => {
                        debouncedSearch.cancel(); // 디바운싱된 호출을 취소
                        handleSearch(searchTerm); // 즉시 검색 수행
                    }}  aria-label="의사 검색">
                        {icon}
                    </button>
                </div>
            </div>
            <div className=" container mx-auto px-4 py-8 flex flex-grow">
                <main className="flex-grow pr-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                        {department.length > 0 ? (
                            department.map((dept, index) => (
                                <div key={index} className="bg-white p-4 rounded shadow">
                                    <h2 className="text-xl font-semibold mb-3">{dept.departmentName}</h2> {/* 의사 이름 */}
                                    <p className="text-gray-600">진료분야:{dept.treatments.join(', ')}</p> {/* 진료 분야 */}
                                </div>
                            ))
                        ) : (
                            <p>Loading...</p> // 로딩 중일 때 표시
                        )}
                    </div>
                </main>
                <div className="flex flex-col ">
                    <QuickMenu/>
                    <ChatBot/>
                </div>
            </div>
        </div>
    );
};

export default DepartmentInfo;
