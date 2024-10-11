import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const AdminList = () => {
    const [admins, setAdmins] = useState([]);

    // API 호출
    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
        try {
            const response = await fetch('/api/users/admin'); // Spring Boot 서버에서 데이터 가져오기
            const data = await response.json();
            setAdmins(data); // 상태 업데이트
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    return (
        <div>
            <h1>회원 목록</h1>
            <table className="min-w-full bg-white">
                <thead>
                <tr>
                    <th className="py-2 px-4 border">번호</th>
                    <th className="py-2 px-4 border">아이디</th>
                    <th className="py-2 px-4 border">이름</th>
                    <th className="py-2 px-4 border">주민등록번호</th>
                    <th className="py-2 px-4 border">이메일</th>
                    <th className="py-2 px-4 border">주소</th>
                    <th className="py-2 px-4 border">상세주소</th>
                    <th className="py-2 px-4 border">가입일</th>
                    <th className="py-2 px-4 border">수정일</th>
                    <th className="py-2 px-4 border">관리자 여부</th>
                    <th className="py-2 px-4 border">탈퇴 여부</th>
                    {/* 필요한 다른 컬럼을 추가하세요 */}
                </tr>
                </thead>
                <tbody>
                {admins.map(admin => (
                    <tr key={admin.userNo} className="hover:bg-gray-100">
                        <td className="py-2 px-4 border">{admin.userNo}</td>
                        <td className="py-2 px-4 border">{admin.userId}</td>
                        <td className="py-2 px-4 border">{admin.userName}</td>
                        <td className="py-2 px-4 border">{admin.userRrn}</td>
                        <td className="py-2 px-4 border">{admin.email}</td>
                        <td className="py-2 px-4 border">{admin.userAdd}</td>
                        <td className="py-2 px-4 border">{admin.userAdd2}</td>
                        <td className="py-2 px-4 border">{format(new Date(admin.createAt), 'yyyy-MM-dd HH:mm:ss')}</td>
                        <td className="py-2 px-4 border">{format(new Date(admin.updateAt), 'yyyy-MM-dd HH:mm:ss')}</td>
                        <td className="py-2 px-4 border">{admin.admin}</td>
                        <td className="py-2 px-4 border">{admin.deleteYn}</td>
                        {/* 필요한 다른 사용자 정보를 추가하세요 */}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
export default AdminList;