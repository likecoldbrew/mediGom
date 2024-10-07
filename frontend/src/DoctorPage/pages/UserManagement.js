import React, { useState } from 'react';
import { Search, UserPlus, Edit, X } from 'lucide-react';

export const UserManagement=()=> {
    const [patientInfo, setPatientInfo] = useState({
        name: '',
        dateOfBirth: '',
        diagnosis: '',
        doctorInCharge: '',
        certificateNumber: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPatientInfo(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Main content */}
            <main className="flex-1 p-8">
                <h1 className="text-2xl font-bold mb-6">환자관리</h1>

                {/* Search bar */}
                <div className="mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="이름 검색"
                            className="w-full p-2 pl-10 border rounded"
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                    </div>
                </div>

                {/* Patient info form */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">환자정보(클릭시)</h2>
                        <button className="text-blue-500 hover:text-blue-700">
                            <X size={24} />
                        </button>
                    </div>

                    <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1">환자명</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={patientInfo.name}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block mb-1">담당의</label>
                                <input
                                    type="text"
                                    name="doctorInCharge"
                                    value={patientInfo.doctorInCharge}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block mb-1">증상</label>
                            <input
                                type="text"
                                name="diagnosis"
                                value={patientInfo.diagnosis}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="block mb-1">진단명</label>
                            <input
                                type="text"
                                name="diagnosis"
                                value={patientInfo.diagnosis}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="block mb-1">증명서 신청 진단서</label>
                            <input
                                type="text"
                                name="certificateNumber"
                                value={patientInfo.certificateNumber}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div className="flex justify-end space-x-2">
                            <button type="button" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                <UserPlus size={20} className="inline mr-2" />
                                등록
                            </button>
                            <button type="button" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                                <Edit size={20} className="inline mr-2" />
                                진료과 변경
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default UserManagement;