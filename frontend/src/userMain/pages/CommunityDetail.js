import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import QuickMenu from "../components/QuickMenu";
import SubCategories from "../components/SubCategory";
import ChatBot from "../components/ChatBot";


const BoardDetail = ({ boardId }) => {
  const location = useLocation();
  const { selectCategory, selectSubCategory } = location.state || {};
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBoardDetail();
  }, [boardId], [board]);

  const fetchBoardDetail = async () => {
    try {
      const response = await fetch(`/api/board/detail?boardId=${boardId}`);
      const data = await response.json();
      if (!data.isEmpty) {
        const formattedData = {
          ...data,
          createAt: formatDate(data.createAt),
          updateAt: data.updateAt ? formatDate(data.updateAt) : null,
          files: data.files || [] // files가 없을 경우 빈 배열로 초기화
        };
        setBoard(formattedData);
      } else {
        console.log("No data found for this board.");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching board detail:", error);
      setLoading(false);
    }
  };
  console.log("ㅂ호두", board);
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        로딩 중...
      </div>
    );
  }

  if (!board) {
    return (
      <div className="flex justify-center items-center h-screen">
        게시글을 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SubCategories />
      <div className="container mx-auto px-4 py-8 flex flex-grow">
        <main className="flex-grow pr-8">
          <div className="w-full rounded-[10px] bg-white p-6 shadow-blue-700 mb-4">
            <div className="flex justify-between items-center mb-4">
              <div className="text-xl">
                <span className="font-bold">{board.title}</span>
              </div>
              <div className="text-gray-600">작성일: {board.createAt}</div>
            </div>
            <hr className="border-t border-sky-200 mb-4" />
            <div className="flex justify-between items-center mb-4">
              <div className="text-gray-600">작성자: {board.userId}</div>
              <div className="text-gray-600">조회수: {board.views}</div>
            </div>
            <hr className="border-t border-sky-200  mb-6" />
            <div className="mt-4">
              <p className="mb-5">{board.content}</p>
              {board.files && board.files.length > 0 ? (
                board.files.map((file) => (
                   file.fileType.startsWith("image/") ? (
                    <img
                      key={file.fileId}
                      src={`/api/file/view/${file.fileId}`} // 이미지 파일을 표시하는 URL
                      alt={file.fileId}
                      className="h-full object-cover mr-2"
                    />
                  ) : (
                    <a key={file.fileId} href={`/file/download/${file.fileId}`} className="text-blue-500 hover:underline mr-2">
                   {file.fileId}
                    </a>
                  )
                ))
              ) : null}
            </div>
            <div className="flex items-center mb-4">
              <span className="mr-2">첨부파일:</span>
              {board.files && board.files.length > 0 ? (
                board.files.map((file) => (
                  <a key={file.id} href={`/file/download/${file.id}`} className="text-blue-500 hover:underline mr-2">
                    {file.fileOriginalName}
                  </a>
                ))
              ) : (
                <span>첨부파일이 없습니다.</span> // 파일이 없을 때 표시할 내용
              )}
            </div>
          </div>
          <div className="flex justify-end items-center">
            <Link
              to={`/community/1`} // 목록 페이지로 돌아가기
              state={{ selectCategory, selectSubCategory }}
              className="text-sky-600 hover:underline mr-4"
            >
              목록으로 돌아가기
            </Link>
            <Link
              to={`/board/update/${boardId}`}
              state={{ selectCategory, selectSubCategory }}
              className="text-sky-600 hover:underline mr-4"
            >
              <button
                className="px-4 py-2  hover:bg-sky-200 hover:font-bold border rounded-md bg-white  text-blue-500 disabled:text-gray-300">
                수정하기
              </button>
            </Link>
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

export default BoardDetail;
