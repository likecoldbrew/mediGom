import React, { useState } from "react";
import { X, Search } from "lucide-react";

export default function ChangeDepartment({ closeModal }) {
  const [formData, setFormData] = useState({
    searchName: "",
    memberName: "",
    diagnosisName: "",
    outpatientDate: "",
    department: "",
    symptoms: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    closeModal(); // 모달 닫기
  };

  const handleSearch = () => {
    console.log("Searching for:", formData.searchName);
    // 검색 기능 구현 가능
  };

  return (
    <div className="font-sans">
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">의료 기록</h2>
            <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                name="searchName"
                value={formData.searchName}
                onChange={handleInputChange}
                placeholder="이름 검색"
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={handleSearch}
                className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Search size={20} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="memberName" className="block text-sm font-medium text-gray-700">
                  회원명
                </label>
                <input
                  type="text"
                  id="memberName"
                  name="memberName"
                  value={formData.memberName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="diagnosisName" className="block text-sm font-medium text-gray-700">
                  진단명
                </label>
                <input
                  type="text"
                  id="diagnosisName"
                  name="diagnosisName"
                  value={formData.diagnosisName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="outpatientDate" className="block text-sm font-medium text-gray-700">
                  외래 날짜
                </label>
                <input
                  type="date"
                  id="outpatientDate"
                  name="outpatientDate"
                  value={formData.outpatientDate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                  변경할 과
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
                >
                  <option value="">선택하세요</option>
                  <option value="내과">내과</option>
                  <option value="외과">외과</option>
                  <option value="소아과">소아과</option>
                  <option value="정형외과">정형외과</option>
                  {/* Add more departments as needed */}
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                등록
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
