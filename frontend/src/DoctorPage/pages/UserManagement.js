import React, { useState, useEffect } from 'react';
import {Moon, Sun, Search, Filter, List, Grid, ChevronUp, ChevronDown, MoreVertical, UserPlus} from 'lucide-react';



const initialProducts = [
    { id: 1, name: 'Ocean', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?...', category: 'Furniture', status: 'active', sales: 11, stock: 36, price: 560 },
    { id: 2, name: 'Lou', image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?...', category: 'Kitchen', status: 'disabled', sales: 6, stock: 46, price: 710 },
    { id: 3, name: 'Yellow', image: '/placeholder.svg?height=40&width=40', category: 'Decoration', status: 'active', sales: 61, stock: 56, price: 360 },
    { id: 4, name: 'Dreamy', image: '/placeholder.svg?height=40&width=40', category: 'Bedroom', status: 'disabled', sales: 41, stock: 66, price: 260 },
    { id: 5, name: 'Boheme', image: '/placeholder.svg?height=40&width=40', category: 'Furniture', status: 'active', sales: 32, stock: 40, price: 350 },
    { id: 6, name: 'Sky', image: '/placeholder.svg?height=40&width=40', category: 'Bathroom', status: 'disabled', sales: 22, stock: 44, price: 160 },
    { id: 7, name: 'Midnight', image: '/placeholder.svg?height=40&width=40', category: 'Furniture', status: 'active', sales: 23, stock: 45, price: 340 },
    { id: 8, name: 'Palm', image: '/placeholder.svg?height=40&width=40', category: 'Decoration', status: 'active', sales: 24, stock: 46, price: 60 },
    { id: 9, name: 'Forest', image: '/placeholder.svg?height=40&width=40', category: 'Living Room', status: 'active', sales: 41, stock: 16, price: 270 },
    { id: 10, name: 'Sand', image: '/placeholder.svg?height=40&width=40', category: 'Living Room', status: 'disabled', sales: 52, stock: 16, price: 230 },
];

const UserManagement = () => {

    const UsersList = () => {
        const [users, setUsers] = useState([]);

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
    };

    const [products, setProducts] = useState(initialProducts);
    const [filteredProducts, setFilteredProducts] = useState(initialProducts);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All Categories');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
    const [sortColumn, setSortColumn] = useState('name');
    const [sortDirection, setSortDirection] = useState('asc');


    useEffect(() => {
        let result = [...products];

        if (searchTerm) {
            result = result.filter(product =>
                Object.values(product).some(value => {
                    if (value !== null && value !== undefined) {
                        return value.toString().toLowerCase().includes(searchTerm.toLowerCase());
                    }
                    return false;
                })
            );
        }

        if (categoryFilter !== 'All Categories') {
            result = result.filter(product => product.category === categoryFilter);
        }

        if (statusFilter !== 'All Status') {
            result = result.filter(product => product.status.toLowerCase() === statusFilter.toLowerCase());
        }

        if (products.length && typeof products[0][sortColumn] === 'undefined') {
            console.error('Invalid sortColumn value:', sortColumn);
        } else {
            result.sort((a, b) => {
                if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
                if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
                return 0;
            });
        }

        setFilteredProducts(result);
    }, [searchTerm, categoryFilter, statusFilter, products, sortColumn, sortDirection]);

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
                    <div className="flex items-center space-x-4">
                        {/*<button type="button"*/}
                        {/*        className="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500">*/}
                        {/*    <UserPlus size={20} className="inline mr-2"/>*/}
                        {/*    환자 진단 등록*/}
                        {/*</button>*/}
                        <div className="relative">
                            <button
                                onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                                className="px-4 py-2.5 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center"
                            >
                                <Filter size={20}/>
                                <span className="ml-2">Filter</span>
                                <ChevronDown className="ml-2 w-4 h-4"/>
                            </button>

                            {isFilterMenuOpen && (
                                <div
                                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10">
                                    <div className="p-4">
                                        <label className="block mb-2">Category</label>
                                        <select
                                            value={categoryFilter}
                                            onChange={(e) => setCategoryFilter(e.target.value)}
                                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                                        >
                                            <option>All Categories</option>
                                            <option>Furniture</option>
                                            <option>Kitchen</option>
                                            <option>Decoration</option>
                                            <option>Bedroom</option>
                                            <option>Bathroom</option>
                                            <option>Living Room</option>
                                        </select>

                                        <label className="block mt-4 mb-2">Status</label>
                                        <select
                                            value={statusFilter}
                                            onChange={(e) => setStatusFilter(e.target.value)}
                                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                                        >
                                            <option>All Status</option>
                                            <option>Active</option>
                                            <option>Disabled</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>

        {/* 회원 전체 목록 리스트 뷰 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
            <table className="w-full">
                            <thead>
                            <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                                <th
                                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort('name')}
                                >
                                    userNo {sortColumn === 'name' && (sortDirection === 'asc' ?
                                    <ChevronUp size={14} className="inline"/> :
                                    <ChevronDown size={14} className="inline"/>)}
                                </th>
                                <th
                                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort('category')}
                                >
                                    userId {sortColumn === 'category' && (sortDirection === 'asc' ?
                                    <ChevronUp size={14} className="inline"/> :
                                    <ChevronDown size={14} className="inline"/>)}
                                </th>
                                <th
                                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort('status')}
                                >
                                    userName {sortColumn === 'status' && (sortDirection === 'asc' ?
                                    <ChevronUp size={14} className="inline"/> :
                                    <ChevronDown size={14} className="inline"/>)}
                                </th>
                                <th
                                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort('sales')}
                                >
                                    userRrn {sortColumn === 'sales' && (sortDirection === 'asc' ?
                                    <ChevronUp size={14} className="inline"/> :
                                    <ChevronDown size={14} className="inline"/>)}
                                </th>
                                <th
                                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort('stock')}
                                >
                                    Email {sortColumn === 'stock' && (sortDirection === 'asc' ?
                                    <ChevronUp size={14} className="inline"/> :
                                    <ChevronDown size={14} className="inline"/>)}
                                </th>
                                <th
                                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort('price')}
                                >
                                    Phone {sortColumn === 'price' && (sortDirection === 'asc' ?
                                    <ChevronUp size={14} className="inline"/> :
                                    <ChevronDown size={14} className="inline"/>)}
                                </th>
                                <th
                                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort('price')}
                                >
                                    UserAdd {sortColumn === 'price' && (sortDirection === 'asc' ?
                                    <ChevronUp size={14} className="inline"/> :
                                    <ChevronDown size={14} className="inline"/>)}
                                </th>
                                <th
                                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort('price')}
                                >
                                    UserCreat {sortColumn === 'price' && (sortDirection === 'asc' ?
                                    <ChevronUp size={14} className="inline"/> :
                                    <ChevronDown size={14} className="inline"/>)}
                                </th>
                                <th
                                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort('price')}
                                >
                                    DeleteYn {sortColumn === 'price' && (sortDirection === 'asc' ?
                                    <ChevronUp size={14} className="inline"/> :
                                    <ChevronDown size={14} className="inline"/>)}
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredProducts.map((product) => (
                                <tr key={product.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <input type="checkbox"
                                                   className="form-checkbox h-5 w-5 mr-3 text-blue-500"/>
                                            <img className="h-10 w-10 rounded-full mr-3" src={product.image}
                                                 alt={product.name}/>
                                            <div className="text-sm font-medium">{product.name}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">{product.category}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span
                          className={`px-2 inline-flex  text-xs leading-5 font-semibold rounded-full ${
                              product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}
                      >
                        {product.status}
                      </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{product.sales}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{product.stock}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">${product.price}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{product.price}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{product.price}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{product.price}</td>

                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
    </div>
    );
};

export default UserManagement;
