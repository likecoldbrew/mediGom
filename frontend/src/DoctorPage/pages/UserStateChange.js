import React, { useState } from "react";
import { Search, UserPlus, Edit, X } from "lucide-react";

<<<<<<< HEAD
export const UserStateChange=({ closeModal })=> {
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    dateOfBirth: '',
    diagnosis: '',
    doctorInCharge: '',
    certificateNumber: '',
=======
export const UserStateChange = () => {
  const [patientInfo, setPatientInfo] = useState({
    name: "",
    dateOfBirth: "",
    diagnosis: "",
    doctorInCharge: "",
    certificateNumber: "",
>>>>>>> main
    certificateType: [], // certificateType을 빈 배열로 초기화
  });

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;

<<<<<<< HEAD
    if (name === 'certificateType') {
=======
    if (name === "certificateType") {
>>>>>>> main
      if (checked) {
        // 체크된 항목을 추가
        setPatientInfo({
          ...patientInfo,
          certificateType: [...patientInfo.certificateType, value],
        });
      } else {
        // 체크 해제된 항목을 제거
        setPatientInfo({
          ...patientInfo,
<<<<<<< HEAD
          certificateType: patientInfo.certificateType.filter((type) => type !== value),
=======
          certificateType: patientInfo.certificateType.filter(
            (type) => type !== value
          ),
>>>>>>> main
        });
      }
    } else {
      // 일반적인 입력 필드 처리
      setPatientInfo({
        ...patientInfo,
        [name]: value,
      });
    }
  };

  return (
<<<<<<< HEAD
      <div className="z-20 mt-20 ml-96 max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md relative">
        {/* Main content */}
        <div className="flex justify-between items-center ">
          <h2 className="text-xl"></h2>
          <button className="text-blue-500 hover:text-blue-700" onClick={closeModal}>
            <X size={24}/>
          </button>
        </div>
        <main className="flex-1 p-5">
          <form className="space-y-10">
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
              <label className="block mb-1">증명서 신청</label>
              <div className="flex space-x-4">
                {/* 진단서 체크박스 */}
                <label className="flex items-center">
                  <input
                      type="checkbox"
                      name="certificateType"
                      value="진단서"
                      checked={patientInfo.certificateType?.includes('진단서') || false}
                      onChange={handleInputChange}
                      className="mr-2"
                  />
                  진단서
                </label>

                {/* 소견서 체크박스 */}
                <label className="flex items-center">
                  <input
                      type="checkbox"
                      name="certificateType"
                      value="소견서"
                      checked={patientInfo.certificateType?.includes('소견서') || false}
                      onChange={handleInputChange}
                      className="mr-2"
                  />
                  소견서
                </label>

                {/* 기타 체크박스 */}
                <label className="flex items-center">
                  <input
                      type="checkbox"
                      name="certificateType"
                      value="기타"
                      checked={patientInfo.certificateType?.includes('기타') || false}
                      onChange={handleInputChange}
                      className="mr-2"
                  />
                  기타
                </label>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <button type="button"
                      className="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500">
                <Edit size={20} className="inline mr-2"/>
                진료과 변경
              </button>
              <button type="button"
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                <UserPlus size={20} className="inline mr-2"/>
                등록
              </button>

            </div>
          </form>
        </main>
      </div>
  );
}
=======
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
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={20}
            />
          </div>
        </div>
>>>>>>> main

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
              <label className="block mb-1">증명서 신청</label>
              <div className="flex space-x-4">
                {/* 진단서 체크박스 */}
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="certificateType"
                    value="진단서"
                    checked={
                      patientInfo.certificateType?.includes("진단서") || false
                    }
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  진단서
                </label>

                {/* 소견서 체크박스 */}
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="certificateType"
                    value="소견서"
                    checked={
                      patientInfo.certificateType?.includes("소견서") || false
                    }
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  소견서
                </label>

                {/* 기타 체크박스 */}
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="certificateType"
                    value="기타"
                    checked={
                      patientInfo.certificateType?.includes("기타") || false
                    }
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  기타
                </label>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500"
              >
                <Edit size={20} className="inline mr-2" />
                진료과 변경
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                <UserPlus size={20} className="inline mr-2" />
                등록
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default UserStateChange;
