import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Certificates from "./Certificates";
import { Search } from "lucide-react"; // Certificates.js 파일을 가져옴

Modal.setAppElement("#root"); // 모달 사용을 위한 안전한 설정

const CertificateList = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [selectedUser, setSelectedUser] = useState(null); // 선택된 사용자 정보
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  // API 호출
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users/all"); // Spring Boot 서버에서 데이터 가져오기
        const data = await response.json();
        setUsers(data); // 상태 업데이트
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    let result = [...users];
    if (searchTerm) {
      result = result.filter((user) =>
        Object.values(user).some((value) => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    setFilteredUsers(result);
  }, [searchTerm, users]);

  const openModal = (user) => {
    setSelectedUser(user); // 선택된 사용자 설정
    setIsModalOpen(true); // 모달 열기
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
    setSelectedUser(null); // 선택된 사용자 초기화
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">증명서 요청</h1>
      </div>
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
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
              <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <th
                  className="px-6 py-3 text-center text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer">
                  번호
                </th>
                <th
                  className="px-6 py-3 text-center text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer">
                  아이디
                </th>
                <th
                  className="px-6 py-3 text-center text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer">
                  이름
                </th>
                <th
                  className="px-6 py-3 text-center text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer">
                  발급 요청
                </th>
              </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredUsers.map((user, index) => (
                <tr key={user.userNo} className="hover:bg-blue-50">
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {user.userNo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {user.userId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {user.userName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button
                      className="px-4 bg-violet-400 text-white py-2 rounded hover:bg-violet-500"
                      onClick={() => openModal(user)}
                    >
                      요청
                    </button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </table>
      </div>
      {/* 모달 창 */}
      <Modal
        className="z-20"
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Certificate Modal"
      >
        {/* Certificates 컴포넌트에 selectedUser 전달 */}
        <Certificates user={selectedUser} closeModal={closeModal} />
      </Modal>
    </div>
  );
};

export default CertificateList;
