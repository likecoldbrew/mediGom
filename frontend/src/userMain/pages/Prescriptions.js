import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import QuickMenu from "../components/QuickMenu";
import SubCategories from "../components/SubCategory";
import ChatBot from "../components/ChatBot";
import { useUser } from "../../utils/UserContext";

const Prescriptions = () => {
  //페이징을 위한 값
  const { page } = useParams();
  // 현재 location에서 카테고리명 받기
  const location = useLocation();
  // 선택된 카테고리 값들
  const { selectCategory, selectSubCategory } = location.state || {};
  //진료 기록
  const [prescriptions, setPrescriptions] = useState([]); // 게시글 가져오기
  //페이징 변수
  const [currentPage, setCurrentPage] = useState(Number(page) || 1);
  /// 페이지 이동을 위한 useNavigate
  const navigate = useNavigate();
  //유저 정보
  const { userInfo } = useUser();

  //페이지 이동시 화면 맨위로 이동
  useEffect(() => {
    if (userInfo) {
      fetchPrescriptions(); // userInfo가 있는 경우에만 호출
    }
    window.scrollTo(0, 0);
  }, [userInfo, page]);

  // URL에서 page가 변경될 때 currentPage 업데이트
  useEffect(() => {
    setCurrentPage(Number(page) || 1);
  }, [page]);


  // 게시글 정보 가져오기
  const fetchPrescriptions= async () => {
    try {
      const response = await fetch(`/api/prescription/all/${userInfo.userNo}`);
      const data = await response.json();
      console.log("e들어오는 처방 기록", data);
      // 날짜 포맷 변환
      const formattedData = data.map((record) => ({
        ...record,
        createAt: formatDate(record.createAt) // 날짜 포맷 변경
      }));
      setPrescriptions(formattedData); // 변환된 데이터로 상태 업데이트
    } catch (error) {
      console.error("Error fetching boards:", error);
    }
  };

  // 날짜 포맷 변환 함수
  const formatDate = (timestamp) => {
    return timestamp.split("T")[0];
  };

  //한 페이지당 게시글 수
  const itemsPerPage = 10; // 페이지당 항목 수

  // 현재 페이지에 해당하는 항목 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = prescriptions.slice(indexOfFirstItem, indexOfLastItem);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(prescriptions.length / itemsPerPage);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    navigate(`/prescript/page/${pageNumber}`, {
      state: { selectCategory, selectSubCategory }
    });
  };

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
                    style={{ width: "150px" }}
                  >
                    진료 번호
                  </th>
                  <th
                    className="px-4 py-2 text-center h-12"
                    style={{ width: "200px" }}
                  >
                    방문일
                  </th>
                  <th
                    className="px-4 py-2 text-center h-12"
                    style={{ width: "450px" }}
                  >
                    처방약
                  </th>
                  <th
                    className="px-4 py-2 text-center h-12"
                    style={{ width: "200px" }}
                  >
                    진료과
                  </th>
                  <th
                    className="px-4 py-2 text-center h-12"
                    style={{ width: "200px" }}
                  >
                    담당의
                  </th>

                </tr>
                </thead>
                <tbody>
                {currentItems.map((pre, index) => (
                  <tr key={pre.prescriptionId} className="border-t border-blue-200">
                    <td className="px-4 py-2 text-center h-12">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="px-4 py-2 text-center h-12">
                      {pre.createAt}
                    </td>
                    <td className="px-4 py-2 text-center h-12">
                      <Link
                        to={`/prescript/detail/${pre.prescriptionId}`} // 제목 클릭 시 이동할 경로
                        state={{ selectCategory, selectSubCategory }} // 카테고리 값 넘겨주기
                        className="text-blue-500 hover:underline"
                      >
                        {pre.medicationName}
                      </Link>
                    </td>
                    <td className="px-4 py-2 text-center  h-12">
                      {pre.departmentName}
                    </td>
                    <td className="px-4 py-2 text-center h-12">
                      {pre.doctorName}
                    </td>
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

export default Prescriptions;