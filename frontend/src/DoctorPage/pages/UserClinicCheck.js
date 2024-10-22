import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Modal from "react-modal";
import UserStateChange from "./UserStateChange";
import ChangeDepartment from "./ChangeDepartment";
import { useParams } from "react-router-dom";

Modal.setAppElement("#root");

const UserClinicCheck = () => {
  const { userNo, doctorNo } = useParams();
  console.log("userNo:", userNo, "doctorNo:", doctorNo);
  const useNo = userNo ? parseInt(userNo) : 0;
  const docNo = doctorNo ? parseInt(doctorNo) : 0;
  const [patients, setPatients] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [filteredMedicalRecords, setFilteredMedicalRecords] = useState([]);
  const [diagnosisPending, setDiagnosisPending] = useState([]);
  const [isUserStateChangeOpen, setIsUserStateChangeOpen] = useState(false);
  const [isChangeDepartmentOpen, setIsChangeDepartmentOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!isNaN(useNo) && !isNaN(docNo)) {
        try {
          const [userReserveResponse, medicalRecordsResponse] = await Promise.all([
            fetch(`/api/medical_record/${docNo}`), // doctorNo 사용
            fetch(`/api/reserve/user/${useNo}`)
          ]);

          const userReserveData = await userReserveResponse.json();
          const medicalRecordsData = await medicalRecordsResponse.json();

          console.log("API Response(user):", userReserveData);
          setPatients(userReserveData);
          console.log("User Reserve Data:", JSON.stringify(userReserveData, null, 2));

          const recordsWithTreatment = medicalRecordsData.filter(
            record => record.diagnosis && record.diagnosis.trim() !== ""
          );

          const recordsWithoutTreatment = medicalRecordsData.filter(
            record => !record.diagnosis || record.diagnosis.trim() === ""
          ).map(record => {
            const userData = userReserveData.find(user => user.id === record.userId);
            return {
              ...record,
              symptom: userData ? userData.symptom : "증상 정보 없음"
            };
          });

          setMedicalRecords(medicalRecordsData);
          setFilteredMedicalRecords(recordsWithTreatment);
          setDiagnosisPending(recordsWithoutTreatment);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        console.error("Invalid user_no:", useNo);
      }
    };
    fetchData();
  }, [useNo, docNo]);

  useEffect(() => {
    const approvedPatients = patients.filter(patient => patient.status === 1);
    const recordsWithTreatment = medicalRecords.filter(record =>
      approvedPatients.some(patient => patient.id === record.userId) &&
      record.diagnosis && record.diagnosis.trim() !== ""
    );

    const recordsWithoutTreatment = medicalRecords.filter(record =>
      approvedPatients.some(patient => patient.id === record.userId) &&
      (!record.diagnosis || record.diagnosis.trim() === "")
    ).map(record => {
      const userData = approvedPatients.find(user => user.id === record.userId);
      return {
        ...record,
        symptom: userData ? userData.symptom : "증상 정보 없음"
      };
    });

    setFilteredMedicalRecords(recordsWithTreatment);
    setDiagnosisPending(recordsWithoutTreatment);
  }, [patients, medicalRecords]);

  useEffect(() => {
    let result = diagnosisPending;
    if (searchTerm) {
      result = result.filter((user) =>
        Object.values(user).some((value) =>
          typeof value === "string" && value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    setFilteredUsers(result);
  }, [searchTerm, diagnosisPending]);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toISOString().split("T")[0];
  };

  const openUserStateChangeModal = (user) => {
    setSelectedUser(user);
    setIsUserStateChangeOpen(true);
  };

  const openChangeDepartmentModal = (user) => {
    setSelectedUser(user);
    setIsChangeDepartmentOpen(true);
  };

  const closeModal = () => {
    setIsUserStateChangeOpen(false);
    setIsChangeDepartmentOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8"></div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 pl-10 pr-4 rounded-md bg-gray-50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      {/* 진단 등록: diagnosis가 없는 데이터만 표시 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden mt-8">
        <h2 className="text-lg font-bold px-6 py-4">진단 등록</h2>
        <table className="w-full">
          <thead>
          <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">번호</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">진료과</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">환자이름</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">환자증상</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">예약일자</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">진단 등록</th>
          </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
          {filteredUsers.map((user, index) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">{user.departmentName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">{user.userName}</td>
              <td
                className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">{user.symptom ? user.symptom : "증상 정보 없음"}</td>
              <td
                className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">{formatDate(user.createAt)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                <div className="flex-center items-center space-x-1">
                  <button
                    onClick={() => openUserStateChangeModal(user)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    등록
                  </button>
                </div>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>

      {/* 의료 기록: treatment가 있는 데이터만 표시 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden mt-8">
        <h2 className="text-lg font-bold px-6 py-4">의료 기록</h2>
        <table className="w-full">
          <thead>
          <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">기록 ID</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">환자이름</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">진단일자</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">진단</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">처방전</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">진료과</th>
          </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
          {filteredMedicalRecords.map((record, index) => (
            <tr key={record.recordId}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">{record.recordId}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">{record.userName}</td>
              <td
                className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">{formatDate(record.visitDate)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">{record.diagnosis}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">{record.prescription}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">{record.departmentName}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>

      {/* Modal 컴포넌트 */}
      <Modal
        isOpen={isUserStateChangeOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="overlay"
      >
        <UserStateChange user={selectedUser} onClose={closeModal} />
      </Modal>

      <Modal
        isOpen={isChangeDepartmentOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="overlay"
      >
        <ChangeDepartment user={selectedUser} onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default UserClinicCheck;
