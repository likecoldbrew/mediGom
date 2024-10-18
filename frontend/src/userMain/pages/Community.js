import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import QuickMenu from "../components/QuickMenu";
import SubCategories from "../components/SubCategory";
import ChatBot from "../components/ChatBot";

const Community = () => {
  const { subcategory } = useParams(); // URL에서 subcategory 가져오기
  const { page } = useParams(); // URL에서 page만 가져오기
  const location = useLocation(); // 현재 location 가져오기
  const { selectCategory, selectSubCategory } = location.state || {}; // 헤더에서 전달받은 값
  const [boards, setBoards] = useState([]); // 게시글 가져오기
  const [loading, setLoading] = useState(true); // 로딩 메시지
  const [currentPage, setCurrentPage] = useState(Number(page) || 1); // URL에서 페이지 번호 설정
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate
  const [userInfo, setUserInfo] = useState(null); // 유저 정보

  // API 호출
  useEffect(() => {
    fetchBoards();
    window.scrollTo(0, 0);
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token"); // JWT를 로컬 스토리지에서 가져옴
      if (token) {
        const response = await fetch("/api/users/me", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}` // JWT 포함
          }
        });

        if (response.ok) {
          const data = await response.json(); // 서버에서 반환하는 사용자 정보
          setUserInfo(data); // 사용자 정보 상태 업데이트
        } else {
          console.error("사용자 정보를 가져오는 데 실패했습니다.");
        }
      }
    };
    fetchUserInfo();
  }, []);


  // URL에서 page가 변경될 때 currentPage 업데이트
  useEffect(() => {
    setCurrentPage(Number(page) || 1);
  }, [page]);

  // 게시글 정보 가져오기
  const fetchBoards = async () => {
    try {
      const response = await fetch("/api/board/all");
      const data = await response.json();
      // 날짜 포맷 변환
      const formattedData = data.map((board) => ({
        ...board,
        createAt: formatDate(board.createAt), // 날짜 포맷 변경
      }));

      setBoards(formattedData); // 변환된 데이터로 상태 업데이트
      setLoading(false); // 로딩 완료
    } catch (error) {
      console.error("Error fetching boards:", error);
      setLoading(false); // 로딩 종료
    }
  };

  // 날짜 포맷 변환 함수
  const formatDate = (timestamp) => {
    const date = new Date(timestamp); // timestamp를 Date 객체로 변환
    const year = date.getFullYear(); // 연도
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월 (0부터 시작하므로 1 추가)
    const day = String(date.getDate()).padStart(2, "0"); // 일
    return `${year}-${month}-${day}`; // 형식: YYYY-MM-DD
  };

  //한 페이지당 게시글 수
  const itemsPerPage = 10; // 페이지당 항목 수

  // 현재 페이지에 해당하는 항목 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = boards.slice(indexOfFirstItem, indexOfLastItem);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(boards.length / itemsPerPage);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    // 페이지 번호와 함께 selectCategory와 selectSubCategory를 state로 전달
    navigate(`/community/page/${pageNumber}`, {
      state: { selectCategory, selectSubCategory },
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        로딩 중...
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SubCategories />
      <div className="container mx-auto px-4 py-8 flex flex-grow">
        <main className="flex-grow flex-col pr-8">
          <div className="flex-col min-h-full space-y-4 items-center justify-center">
            <div className="overflow-x-auto">
              <table className="w-full h-3 rounded-[10px] bg-white p-4 shadow-blue-700 relative">
                <thead>
                  <tr>
                    <th
                      className="px-4 py-2 text-center h-12"
                      style={{ width: "80px" }}
                    >
                      글 번호
                    </th>
                    <th
                      className="px-4 py-2 text-center h-12"
                      style={{ width: "300px" }}
                    >
                      제목
                    </th>
                    <th
                      className="px-4 py-2 text-center h-12"
                      style={{ width: "120px" }}
                    >
                      작성자
                    </th>
                    <th
                      className="px-4 py-2 text-center h-12"
                      style={{ width: "80px" }}
                    >
                      조회수
                    </th>
                    <th
                      className="px-4 py-2 text-center h-12"
                      style={{ width: "120px" }}
                    >
                      작성일자
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((board, index) => (
                    <tr key={board.id} className="border-t border-blue-200">
                      <td className="px-4 py-2 text-center h-12">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="px-4 py-2 text-center h-12">
                        <Link
                          to={`/board/detail/${board.boardId}`} // 제목 클릭 시 이동할 경로
                          state={{ selectCategory, selectSubCategory }} // 카테고리 값 넘겨주기
                          className="text-blue-500 hover:underline"
                        >
                          {board.title}
                        </Link>
                      </td>
                      <td className="px-4 py-2 text-center h-12">
                        {board.userId}
                      </td>
                      <td className="px-4 py-2 text-center h-12">
                        {board.views}
                      </td>
                      <td className="px-4 py-2 text-center h-12">
                        {board.updateAt
                          ? formatDate(board.updateAt)
                          : formatDate(board.createAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end">
              {userInfo? (
                <>
                  <Link
                    to={`/board/register`}
                    state={{ selectCategory, selectSubCategory }}
                    className="text-sky-600 hover:underline mr-4"
                  >
                    <button className="px-4 hover:bg-sky-200 hover:font-bold py-2 border rounded-md bg-white  text-blue-500 disabled:text-gray-300">
                      후기 등록
                    </button>
                  </Link>
                </>
              ):null}
            </div>
            <div className="flex justify-center items-center space-x-2 mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded-md bg-white text-blue-500 disabled:text-gray-300"
              >
                이전
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`px-4 py-2 border rounded-md ${
                      currentPage === pageNumber
                        ? "bg-sky-300 text-white"
                        : "bg-white text-blue-500"
                    }`}
                  >
                    {pageNumber}
                  </button>
                )
              )}
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
          <QuickMenu />
          <ChatBot />
        </div>
      </div>
    </div>
  );
};

export default Community;
