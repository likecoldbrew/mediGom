import React, { useState, useEffect } from "react";
import { format } from "date-fns";

const AllUsersList = () => {
  const [users, setUsers] = useState([]);

  // API 호출
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users/all"); // Spring Boot 서버에서 데이터 가져오기
      const data = await response.json();
      setUsers(data); // 상태 업데이트
    } catch (error) {
      console.error("Error fetching users:", error);
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
          {users.map((user) => (
            <tr key={user.userNo} className="hover:bg-gray-100">
              <td className="py-2 px-4 border">{user.userNo}</td>
              <td className="py-2 px-4 border">{user.userId}</td>
              <td className="py-2 px-4 border">{user.userName}</td>
              <td className="py-2 px-4 border">{user.userRrn}</td>
              <td className="py-2 px-4 border">{user.email}</td>
              <td className="py-2 px-4 border">{user.userAdd}</td>
              <td className="py-2 px-4 border">{user.userAdd2}</td>
              <td className="py-2 px-4 border">
                {format(new Date(user.createAt), "yyyy-MM-dd HH:mm:ss")}
              </td>
              <td className="py-2 px-4 border">
                {format(new Date(user.updateAt), "yyyy-MM-dd HH:mm:ss")}
              </td>
              <td className="py-2 px-4 border">{user.admin}</td>
              <td className="py-2 px-4 border">{user.deleteYn}</td>
              {/* 필요한 다른 사용자 정보를 추가하세요 */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsersList;
