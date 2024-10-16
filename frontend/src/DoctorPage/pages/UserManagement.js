import React, { useState, useEffect } from "react";
import {
  Moon,
  Sun,
  Search,
  Filter,
  List,
  Grid,
  ChevronUp,
  ChevronDown,
  MoreVertical,
  UserPlus,
} from "lucide-react";

const initialProducts = [
  {
    id: 1,
    name: "Ocean",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?...",
    category: "Furniture",
    status: "active",
    sales: 11,
    stock: 36,
    price: 560,
  },
  {
    id: 2,
    name: "Lou",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?...",
    category: "Kitchen",
    status: "disabled",
    sales: 6,
    stock: 46,
    price: 710,
  },
  {
    id: 3,
    name: "Yellow",
    image: "/placeholder.svg?height=40&width=40",
    category: "Decoration",
    status: "active",
    sales: 61,
    stock: 56,
    price: 360,
  },
  {
    id: 4,
    name: "Dreamy",
    image: "/placeholder.svg?height=40&width=40",
    category: "Bedroom",
    status: "disabled",
    sales: 41,
    stock: 66,
    price: 260,
  },
  {
    id: 5,
    name: "Boheme",
    image: "/placeholder.svg?height=40&width=40",
    category: "Furniture",
    status: "active",
    sales: 32,
    stock: 40,
    price: 350,
  },
  {
    id: 6,
    name: "Sky",
    image: "/placeholder.svg?height=40&width=40",
    category: "Bathroom",
    status: "disabled",
    sales: 22,
    stock: 44,
    price: 160,
  },
  {
    id: 7,
    name: "Midnight",
    image: "/placeholder.svg?height=40&width=40",
    category: "Furniture",
    status: "active",
    sales: 23,
    stock: 45,
    price: 340,
  },
  {
    id: 8,
    name: "Palm",
    image: "/placeholder.svg?height=40&width=40",
    category: "Decoration",
    status: "active",
    sales: 24,
    stock: 46,
    price: 60,
  },
  {
    id: 9,
    name: "Forest",
    image: "/placeholder.svg?height=40&width=40",
    category: "Living Room",
    status: "active",
    sales: 41,
    stock: 16,
    price: 270,
  },
  {
    id: 10,
    name: "Sand",
    image: "/placeholder.svg?height=40&width=40",
    category: "Living Room",
    status: "disabled",
    sales: 52,
    stock: 16,
    price: 230,
  },
];

const UserManagement = () => {

  const [users, setUsers] = useState([]);

  // API 호출
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users/patients'); // userNo는 필요한 값으로 변경
      const data = await response.json();
      setUsers(data); // 받아온 데이터를 상태로 저장
      console.log(data);
    } catch (error) {
      console.error('Error fetching medical records:', error);
    }
  };


  const [filteredusers, setFilteredusers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');


  useEffect(() => {

    let result = [...users];

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

    if (users.length && typeof users[0][sortColumn] === 'undefined') {
      console.error('Invalid sortColumn value:', sortColumn);
    } else {
      result.sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setFilteredusers(result);
  }, [searchTerm, categoryFilter, statusFilter, users, sortColumn, sortDirection]);

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

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
                  className="px-2 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('name')}
              >
                번호 {sortColumn === 'name' && (sortDirection === 'asc' ?
                  <ChevronUp size={14} className="inline"/> :
                  <ChevronDown size={14} className="inline"/>)}
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer">진료과
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer">
                담당의
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer">
                환자이름
              </th>
              <th className="px-12 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer">
                진료내역
              </th>
            </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredusers.map((user) => (
                <tr key={user.userId}>
                  <td className="px-6 py-4 whitespace-nowrap text-center">{user.userNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">{user.departmentName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">{user.doctorName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">{user.userName}</td>
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
