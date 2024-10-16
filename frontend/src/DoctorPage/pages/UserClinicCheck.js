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

const UserClinicCheck = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users/all');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

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
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">내 환자 확인</h1>
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
            <thead>
            <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">번호</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">진료과</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">환자이름</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">진료상태</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">진단등록</th>
            </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
            {filteredUsers.map((user, index) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">{user.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">{user.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    <button
                        onClick={() => openModal(user)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      등록
                    </button>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>

        {/* 모달 */}
        {isModalOpen && (
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="User State Change Modal"
                className="fixed inset-0 flex items-center justify-center z-50"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            >
              <UserStateChange user={selectedUser} closeModal={closeModal} />
            </Modal>
        )}
      </div>

  );
};

export default UserClinicCheck;
