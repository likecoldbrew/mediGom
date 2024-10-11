import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import QuickMenu from "../components/QuickMenu";
import SubCategories from "../components/SubCategory";
import ChatBot from "../components/ChatBot";


const Community = () => {
    const {subcategory} = useParams(); // URL에서 subcategory 가져오기
    const [boards, setBoards] = useState([]); //게시글 가져오기
    const [loading, setLoading] = useState(true); //로딩시 띄워줄 메세지
    const [currentPage, setCurrentPage] = useState(1); //페이징을 위한 변수
    // API 호출
    useEffect(() => {
        fetchBoards();
    }, []);

    //게시글 정보
    const fetchBoards = async () => {
        try {
            const response = await fetch('/api/board/all')
            const data = await response.json();
            setBoards(data)
        } catch (error) {
            console.error('Error fetching doctor info:', error);
        }
    }

    const itemsPerPage = 2; // Number of items to display per page

    // Calculate the index range for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = boards.slice(indexOfFirstItem, indexOfLastItem); // 수정된 부분

    // Calculate total number of pages
    const totalPages = Math.ceil(boards.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    return (
        <div className="flex flex-col min-h-screen">
            <SubCategories/>
            <div className=" container mx-auto px-4 py-8 flex flex-grow">
                <main className="flex-grow flex-col pr-8">
                    <div className="flex-col min-h-full space-y-4 items-center justify-center">
                        <div className="overflow-x-auto">
                            <table className="w-full h-3 rounded-[10px] bg-white p-4  shadow-blue-700 relative">
                                <thead>
                                <tr>
                                    <th className="px-4 text-center h-12 py-2">글 번호</th>
                                    <th className="px-4 py-2 text-center h-12 ">제목</th>
                                    <th className="px-4 py-2 text-center h-12 ">작성자</th>
                                    <th className="px-4 py-2 text-center h-12 ">조회수</th>
                                    <th className="px-4 py-2 text-center h-12 ">작성일자</th>
                                </tr>
                                </thead>
                                <tbody>
                                {currentItems.map((board ) => (
                                    <tr key={board .id} className="border-t border-blue-200">
                                        <td className="px-4 py-2 text-center h-12 ">{board.boardId}</td>
                                        <td className="px-4 py-2 text-center h-12 ">{board.title}</td>
                                        <td className="px-4 py-2 text-center h-12 ">{board.userId}</td>
                                        <td className="px-4 py-2 text-center h-12 ">{board.views}</td>
                                        <td className="px-4 py-2 text-center h-12 ">{board.createAt}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-center items-center space-x-2 mt-4">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-4 py-2 border rounded-md bg-white text-blue-500 disabled:text-gray-300"
                            >
                                이전
                            </button>
                            {Array.from({length: totalPages}, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`px-4 py-2 border rounded-md ${
                                        currentPage === page ? 'bg-sky-300  text-white' : 'bg-white text-blue-500'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 border rounded-md bg-white text-blue-500 disabled:text-gray-300"
                            >
                                다음
                            </button>
                        </div>
                    </div>
                </main>
                <div className="flex flex-col space-y-4">
                    <QuickMenu/>
                    <ChatBot/>
                </div>
            </div>
        </div>
    );
};

export default Community;

