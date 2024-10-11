import React, { useState, useEffect } from 'react';
import { X,Label, Input, Button, Filter, List, Grid, ChevronUp, ChevronDown, MoreVertical, UserPlus } from 'lucide-react';

const Certificates = ({ closeModal }) => {
    const [patientName, setPatientName] = useState('');
    const [certificateSearch, setCertificateSearch] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [showRefuseModal, setShowRefuseModal] = useState(false);
    const [selectedCertificates, setSelectedCertificates] = useState([]);

    const certificates = ['진단서', '소견서', '처방전'];
    const departments = ['내과', '일반외과', '정형외과', '소아청소년과', '산부인과', '심장내과', '신경과', '신경외과', '피부과', '안과', '이비인후과', '비뇨기과', '정신건강의학과', '영상의학과', '종양내과', '소화기내과', '신장내과', '내분비내과', '혈액내과', '류마티스내과', '감염내과', '알레르기내과', '성형외과', '응급의학과', '마취통증의학과', '가정의학과', '재활의학과', '치과', '호흡기내과', '혈관외과', '흉부외과', '핵의학과', '병리과'];

    const handleNameChange = (event) => {
        setPatientName(event.target.value);
    };

    const handleCertificateSearchChange = (event) => {
        setCertificateSearch(event.target.value);
    };

    const handleDepartmentChange = (event) => {
        setSelectedDepartment(event.target.value);
    };

    const handleRefuse = () => {
        setShowRefuseModal(true);
    };

    const handleConfirmRefuse = () => {
        // 거부 처리 로직 추가
        setShowRefuseModal(false);
    };

    const handleCancelRefuse = () => {
        setShowRefuseModal(false);
    };

    const handleCertificateChange = (certificate) => {
        setSelectedCertificates(prev =>
            prev.includes(certificate)
                ? prev.filter(c => c !== certificate)
                : [...prev, certificate]
        );
    };

    return (
        <div>
            <div className="z-20 mt-20 ml-96 max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md relative">
                {/* X 버튼 추가 */}
                <div className="flex justify-between items-center ">
                    <h2 className="text-xl"></h2>
                    <button className="text-blue-500 hover:text-blue-700" onClick={closeModal}>
                        <X size={24}/>
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <div>
                        <label htmlFor="nameSearch" className="block text-sm font-medium text-gray-700 mb-1">환자
                            성명</label>
                        <input
                            id="nameSearch"
                            type="text"
                            value={patientName}
                            onChange={handleNameChange}
                            placeholder="환자 이름 띄워야함"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">담당
                            진료과</label>
                        <select
                            id="department"
                            value={selectedDepartment}
                            onChange={handleDepartmentChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">선택하세요</option>
                            {departments.map(dept => (
                                <option key={dept} value={dept}>{dept}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="certificateSearch" className="block text-sm font-medium text-gray-700 mb-1">담당
                            의사</label>
                        <input
                            id="certificateSearch"
                            type="text"
                            value={certificateSearch}
                            onChange={handleCertificateSearchChange}
                            placeholder="담당의 이름 떠야함"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="nameSearch" className="block text-sm font-medium text-gray-700 mb-1">증상명</label>
                        <input
                            id="nameSearch"
                            type="text"
                            value={patientName}
                            onChange={handleNameChange}
                            placeholder="증상 입력"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="nameSearch" className="block text-sm font-medium text-gray-700 mb-1">증명서
                            종류</label>
                        <select
                            id="department"
                            value={selectedDepartment}
                            onChange={handleDepartmentChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">선택하세요</option>
                            {departments.map(dept => (
                                <option key={dept} value={dept}>{dept}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="nameSearch" className="block text-sm font-medium text-gray-700 mb-1"></label>
                    </div>
                    <div>
                        <label htmlFor="nameSearch" className="block text-sm font-medium text-gray-700 mb-1">진단
                            내용</label>
                        <textarea className="w-[850px] h-[100px] border rounded p-1 " placeholder="내용을 입력하세요."/>
                    </div>
                </div>

                <div className="mb-6 flex flex-col items-center">
                    <p className="text-sm font-medium text-gray-700 mb-2">증명서를 발급 하시겠습니까?</p>
                    <div className="flex space-x-4">
                        <button onClick={handleRefuse}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                            취소
                        </button>
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            발급
                        </button>
                    </div>
                </div>

                {showRefuseModal && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
                         id="my-modal">
                        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                            <div className="mt-3 text-center">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">증명서 발급을 거부 하시겠습니까?</h3>
                                <div className="mt-2 px-7 py-3">
                                    <p className="text-sm text-gray-500">
                                        이 작업은 취소할 수 없습니다.
                                    </p>
                                </div>
                                <div className="items-center px-4 py-3">
                                    <button
                                        onClick={handleCancelRefuse}
                                        className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-24 mr-2 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                    >
                                        취소
                                    </button>
                                    <button
                                        onClick={handleConfirmRefuse}
                                        className="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md w-24 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
                                    >
                                        거부
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Certificates;
