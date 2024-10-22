import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, UserPlus, Edit, X } from "lucide-react";

export const UserStateChange = ({ user, closeModal }) => {
  const [patientInfo, setPatientInfo] = useState({
    userName: "",
    diagnosis: "",
    treatment: "",
    prescription: "",
    notes: "",
    doctorNo: "", // 담당 의사 번호를 위한 필드 추가
    certificateType: []
  });

  useEffect(() => {
    if (user) {
      setPatientInfo({
        recordId: user.recordId || "", // 여기서 recordId를 가져옵니다.
        userName: user.userName || "",
        diagnosis: user.diagnosis || "",
        treatment: user.treatment || "",
        prescription: user.prescription || "",
        notes: user.notes || "",
        doctorNo: user.doctorNo || "", // 여기서 doctorNo를 가져옵니다.
        certificateType: [] // 초기화 (필요한 경우)
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "certificateType") {
      if (checked) {
        setPatientInfo((prev) => ({
          ...prev,
          certificateType: [...prev.certificateType, value]
        }));
      } else {
        setPatientInfo((prev) => ({
          ...prev,
          certificateType: prev.certificateType.filter(type => type !== value)
        }));
      }
    } else {
      setPatientInfo((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // update 요청을 처리하는 함수
  const handleSubmit = async () => {
    try {
      const response = await axios.put(`/api/medical_record/${patientInfo.recordId}`, {
        doctorNo: patientInfo.doctorNo, // 담당 의사 번호
        userName: patientInfo.userName,
        diagnosis: patientInfo.diagnosis,
        treatment: patientInfo.treatment,
        // departmentName: "", // 필요 시 추가
        prescription: patientInfo.prescription,
        notes: patientInfo.notes,
        certificateType: patientInfo.certificateType // 증명서 종류
      });
      console.log("Update Success:", response.data); // 성공 시 응답 데이터를 출력
      closeModal(); // 모달을 닫습니다.
    } catch (error) {
      console.error("Update Failed:", error); // 오류가 발생하면 오류 메시지를 출력
    }
  };

  return (
    <div className="font-sans">
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl">환자 정보 등록</h2>
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
                    name="userName"
                    value={patientInfo.userName}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">담당 의사 번호</label>
                  <input
                    type="text"
                    name="doctorNo"
                    value={patientInfo.doctorNo}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
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
                <label className="block mb-1">치료내용</label>
                <input
                  type="text"
                  name="treatment"
                  value={patientInfo.treatment}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block mb-1">처방내용</label>
                <input
                  type="text"
                  name="prescription"
                  value={patientInfo.prescription}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block mb-1">추가사항</label>
                <input
                  type="text"
                  name="notes"
                  value={patientInfo.notes}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block mb-1">증명서 신청</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="certificateType"
                      value="진단서"
                      checked={patientInfo.certificateType.includes("진단서")}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    진단서
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="certificateType"
                      value="소견서"
                      checked={patientInfo.certificateType.includes("소견서")}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    소견서
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="certificateType"
                      value="기타"
                      checked={patientInfo.certificateType.includes("기타")}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    기타
                  </label>
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={handleSubmit}
                >
                  <UserPlus size={20} className="inline mr-2" />
                  등록
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
};

export default UserStateChange;
