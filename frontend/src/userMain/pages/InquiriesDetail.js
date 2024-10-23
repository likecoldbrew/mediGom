import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import QuickMenu from "../components/QuickMenu";
import SubCategories from "../components/SubCategory";
import ChatBot from "../components/ChatBot";

const InquiriesDetail = ({ inquirieId }) => {
  const location = useLocation();
  const { selectCategory, selectSubCategory } = location.state || {};
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBoardDetail();
  }, [inquirieId]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const fetchBoardDetail = async () => {
    try {
      const response = await fetch(`/api/inquiries/detail?inquirieId=${inquirieId}`);
      const data = await response.json();
      if (!data.isEmpty) {
        const formattedData = {
          ...data,
          createAt: formatDate(data.createAt),
          updateAt: data.updateAt ? formatDate(data.updateAt) : null,
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
                <span className="font-bold">{board.title}</span> | <span
                className="text-[16px]">(유형 : {board.type})</span>
              </div>
              <div className="text-gray-600">작성일: {board.createAt}</div>
            </div>

            <hr className="border-t border-sky-200  mb-6" />
            <div className="mt-4 h-[360px]">
              <p >{board.content}</p>
            </div>
            {board.answer?(
              <>
                <div className="mt-4 h-[300px]">
                  <hr className="border-t border-2 border-dashed border-sky-200 mb-4 mt-4" />
                  <span className="font-bold">답변</span>
                  <hr className="border-t border-sky-200  mt-3" />
                  <p className="mt-3 h-2/5">{board.answer}</p>
                </div>
              </>
            ) : null}
          </div>
          <div className="flex justify-end items-center">
            <Link
              to={`/inquiry`} // 목록 페이지로 돌아가기
              state={{ selectCategory, selectSubCategory }}
              className="text-sky-600 hover:underline mr-4"
            >
              목록으로 돌아가기
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

export default InquiriesDetail;
