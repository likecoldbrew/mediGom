import React, { useState, useEffect } from "react";
import { Moon, Sun, Search, Filter, List, Grid, ChevronUp, ChevronDown, MoreVertical, UserPlus } from "lucide-react";
import { useParams } from "react-router-dom";

const UserManagement = () => {
  const { userNo } = useParams(); // URL에서 userId 가져오기
  const id = parseInt(userNo);

  const [allPatient, setAllPatient] = useState([]);

  // API 호출
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const [userResponse, recordResponse] = await Promise.all([
          fetch(`http://localhost:8080/api/users/${2}`),
          fetch(`http://localhost:8080/api/medical_record/${52}`)
        ]);
        // const response = await fetch(`http://localhost:8080/api/medical_record/${52}`); // userNo는 필요한 값으로 변경
        const userData = await userResponse.json();
        const recordData = await recordResponse.json();

        console.log(userData);

        setAllPatient({
          users: userData.user || {},
          records: recordData.map((record) => ({
            ...record,
            createAt: format(new Date(record.createAt), "yyyy.MM.dd") // 진단일자 포맷팅
          })) // 받아온 데이터를 상태로 저장
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUsers();
  }, [id]);

  console.log(allPatient);

  const [filteredusers, setFilteredusers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {

    let result = [...allPatient];

    console.log(result);

    if (searchTerm) {
      result = result.filter(user =>
        Object.values(user).some(value => {
          if (value !== null && value !== undefined) {
            return value.toString().toLowerCase().includes(searchTerm.toLowerCase());
          }
          return false;
        })
      );
    }
    setFilteredusers(result);
  }, [searchTerm, allPatient]);


  return (

    <div className="container mx-auto px-4 py-8">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">환자 목록</h1>
      </div>
      {/* 검색 및 필터 */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search" w-full px-3 py-2 text-sm text-black bg-gray-100 rounded-md
            className="w-full px-4 py-2 pl-10 pr-4 rounded-md bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      {/* 회원 전체 목록 리스트 뷰 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
          <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <th
              className="px-2 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer">
              번호
            </th>
            <th
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer">
              진료과
            </th>
            <th
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer">
              담당의
            </th>
            <th
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer">
              환자이름
            </th>
            <th
              className="px-12 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer">
              진료내역
            </th>
          </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {filteredusers.map((user, index) => (
            <tr key={user.userId}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap text-center">{user.departmentName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-center">{user.userNo}</td>
              <td className="px-6 py-4 whitespace-nowrap text-center">{user.userNo.userName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-center">{user.diagnosis}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
