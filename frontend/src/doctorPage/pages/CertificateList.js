import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Certificates from './Certificates'; // Certificates.js 파일을 가져옴

Modal.setAppElement('#root'); // 모달 사용을 위한 안전한 설정

const CertificateList = () => {
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
    const [selectedUser, setSelectedUser] = useState(null); // 선택된 사용자 정보

    // API 호출
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/users/all'); // Spring Boot 서버에서 데이터 가져오기
            const data = await response.json();
            setUsers(data); // 상태 업데이트
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const openModal = (user) => {
        setSelectedUser(user); // 선택된 사용자 설정
        setIsModalOpen(true);  // 모달 열기
    };

    const closeModal = () => {
        setIsModalOpen(false); // 모달 닫기
        setSelectedUser(null); // 선택된 사용자 초기화
    };

    return (
        <div>
                    <h1>증명서 요청</h1>
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                <table className="w-full">
                    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer">번호</th>
                                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer">아이디</th>
                                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer">이름</th>
                                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer">발급 요청</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {users.map((user) => (
                                <tr key={user.userNo} className="hover:bg-blue-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{user.userNo}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{user.userId}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{user.userName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <button
                                            className="px-4 bg-yellow-400 text-white py-2 rounded hover:bg-yellow-500"
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
            <Modal className="z-20" isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Certificate Modal">
                {/* Certificates 컴포넌트에 selectedUser 전달 */}
                <Certificates user={selectedUser} closeModal={closeModal} />
            </Modal>
        </div>
    );
};

export default CertificateList;
