import React, { useState, useEffect } from 'react';
import {Label, Input, Button, Filter, List, Grid, ChevronUp, ChevronDown, MoreVertical, UserPlus} from 'lucide-react';

const Certificates=()=> {
    const [patientName, setPatientName] = useState('');
    const [certificateSearch, setCertificateSearch] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [showRefuseModal, setShowRefuseModal] = useState(false);
    const [selectedCertificates, setSelectedCertificates] = useState([]);

    const certificates = ['진단서', '소견서', '처방전'];
    const departments = ['내과', '외과', '소아과', '산부인과', '정형외과'];

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
        // Add refuse logic here
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
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                    <label htmlFor="nameSearch" className="block text-sm font-medium text-gray-700 mb-1">이름 검색</label>
                    <input
                        id="nameSearch"
                        type="text"
                        value={patientName}
                        onChange={handleNameChange}
                        placeholder="환자 이름 입력"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="certificateSearch" className="block text-sm font-medium text-gray-700 mb-1">증명서 검색</label>
                    <input
                        id="certificateSearch"
                        type="text"
                        value={certificateSearch}
                        onChange={handleCertificateSearchChange}
                        placeholder="증명서 검색"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">진료과</label>
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
            </div>

            <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 mb-2">신청증명서:</p>
                <div className="space-y-2">
                    {certificates.map(cert => (
                        <label key={cert} className="flex items-center">
                            <input
                                type="checkbox"
                                checked={selectedCertificates.includes(cert)}
                                onChange={() => handleCertificateChange(cert)}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                            />
                            <span className="text-sm text-gray-700">{cert}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 mb-2">증명서를 발급 하시겠습니까?</p>
                <div className="flex space-x-4">
                    <button onClick={handleRefuse} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                        취소
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        발급
                    </button>
                </div>
            </div>

            {showRefuseModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
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
}
export default Certificates;