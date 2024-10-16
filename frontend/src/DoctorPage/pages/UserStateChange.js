import React, { useState } from "react";
import { Search, UserPlus, Edit, X } from "lucide-react";

export const UserStateChange = ({ closeModal }) => {
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    dateOfBirth: '',
    diagnosis: '',
    doctorInCharge: '',
    certificateNumber: '',
    certificateType: [], // Initialize certificateType as an empty array
  });

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === 'certificateType') {
      if (checked) {
        // Add checked item
        setPatientInfo((prev) => ({
          ...prev,
          certificateType: [...prev.certificateType, value],
        }));
      } else {
        // Remove unchecked item
        setPatientInfo((prev) => ({
          ...prev,
          certificateType: prev.certificateType.filter((type) => type !== value),
        }));
      }
    } else {
      // Handle other input fields
      setPatientInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="z-20 mt-20 ml-96 max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md relative">
      {/* Main content */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl">환자 정보</h2>
        <button className="text-blue-500 hover:text-blue-700" onClick={closeModal}>
          <X size={24} />
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
              {/* Diagnosis certificate checkbox */}
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="certificateType"
                  value="진단서"
                  checked={patientInfo.certificateType.includes('진단서')}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                진단서
              </label>

              {/* Opinion certificate checkbox */}
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="certificateType"
                  value="소견서"
                  checked={patientInfo.certificateType.includes('소견서')}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                소견서
              </label>

              {/* Other certificate checkbox */}
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="certificateType"
                  value="기타"
                  checked={patientInfo.certificateType.includes('기타')}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                기타
              </label>
            </div>
          </div>

          <div className="flex justify-between items-center">
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
      </main>
    </div>
  );
};

export default UserStateChange;
