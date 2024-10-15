import React, { useState, useEffect } from "react";
import { Search, Filter, ChevronUp, ChevronDown } from "lucide-react";

const DoctorList = () => {
  const [admins, setAdmins] = useState([]);
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [sortColumn, setSortColumn] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  // API 호출
  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await fetch("/api/users/admin"); // Spring Boot 서버에서 데이터 가져오기
      const data = await response.json();
      setAdmins(data); // 상태 업데이트
      setFilteredAdmins(data); // 필터링된 목록 초기화
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    let result = [...admins];

    if (searchTerm) {
      result = result.filter((admin) =>
        Object.values(admin).some((value) => {
          if (value !== null && value !== undefined) {
            return value
              .toString()
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
          }
          return false;
        })
      );
    }

    if (statusFilter !== "All Status") {
      result = result.filter(
        (admin) => admin.deleteYn.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    result.sort((a, b) => {
      const aValue = a[sortColumn] ?? "";
      const bValue = b[sortColumn] ?? "";

      // 모든 값들을 문자열로 변환 후 정렬
      const aString = aValue.toString();
      const bString = bValue.toString();

      // localeCompare를 사용하여 한국어와 숫자 모두 정렬
      return sortDirection === "asc"
        ? aString.localeCompare(bString, "ko", { numeric: true })
        : bString.localeCompare(aString, "ko", { numeric: true });
    });

    setFilteredAdmins(result);
  }, [searchTerm, statusFilter, admins, sortColumn, sortDirection]);

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        {/* 검색 및 필터 */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search"
              w-full
              px-3
              py-2
              text-sm
              text-black
              bg-gray-100
              rounded-md
              className="w-full px-4 py-2 pl-10 pr-4 rounded-md bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center"
              >
                <Filter size={18} />
                <span className="ml-2">Filter</span>
                <ChevronDown className="ml-2 w-4 h-4" />
              </button>
              {isFilterMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10">
                  <div className="p-4">
                    <label className="block mb-2">Status</label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option>All Status</option>
                      <option value={"N"}>Active</option>
                      <option value={"Y"}>Disabled</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 목록 */}
        {/* 리스트 뷰 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <th
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("userNo")}
                >
                  번호{" "}
                  {sortColumn === "userNo" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp size={14} className="inline" />
                    ) : (
                      <ChevronDown size={14} className="inline" />
                    ))}
                </th>
                <th
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("userId")}
                >
                  아이디{" "}
                  {sortColumn === "userId" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp size={14} className="inline" />
                    ) : (
                      <ChevronDown size={14} className="inline" />
                    ))}
                </th>
                <th
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("userName")}
                >
                  이름{" "}
                  {sortColumn === "userName" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp size={14} className="inline" />
                    ) : (
                      <ChevronDown size={14} className="inline" />
                    ))}
                </th>
                <th
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("phone")}
                >
                  전화번호{" "}
                  {sortColumn === "phone" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp size={14} className="inline" />
                    ) : (
                      <ChevronDown size={14} className="inline" />
                    ))}
                </th>
                <th
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("email")}
                >
                  이메일{" "}
                  {sortColumn === "email" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp size={14} className="inline" />
                    ) : (
                      <ChevronDown size={14} className="inline" />
                    ))}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredAdmins.map((admin) => (
                <tr key={admin.userNo}>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center">
                      <div className="text-sm font-medium">{admin.userNo}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    {admin.userId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span
                      className={`px-2 inline-flex  text-xs leading-5 font-semibold rounded-full ${
                        admin.deleteYn === "N"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {admin.userName}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {admin.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {admin.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default DoctorList;
