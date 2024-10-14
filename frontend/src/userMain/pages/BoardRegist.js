import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import SubCategories from "../components/SubCategory";
import QuickMenu from "../components/QuickMenu";
import ChatBot from "../components/ChatBot";

const BoardRegist = () => {
  const { boardId } = useParams(); // URL에서 boardId 가져오기 (선택적)
  const navigate = useNavigate();
  const location = useLocation();
  const { selectCategory, selectSubCategory } = location.state || {};
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  // 유저 정보를 저장할 state
  const [username, setUsername] = useState("user10");

  // 로그인한 유저의 정보를 가져오기 위한 useEffect
  // useEffect(() => {
  //   const storedUser = localStorage.getItem("username"); // 또는 API 호출
  //   if (storedUser) {
  //     setUsername(storedUser);
  //   } else {
  //     navigate("/login");
  //   }
  // }, [navigate]);

  const handleFileChange = (event) => {
    setFiles(Array.from(event.target.files));
  };

  // 날짜 포맷 변환 함수
  const formatDate = (timestamp) => {
    const date = new Date(timestamp); // timestamp를 Date 객체로 변환
    const year = date.getFullYear(); // 연도
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월 (0부터 시작하므로 1 추가)
    const day = String(date.getDate()).padStart(2, "0"); // 일
    return `${year}-${month}-${day}`; // 형식: YYYY-MM-DD
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("userNo", 10); // 예시로 userNo 추가

    // 파일이 존재할 경우에만 formData에 추가
    if (files.length > 0) {
      files.forEach((file) => {
        formData.append("file", file);
      });
    }

    try {
      const response = await fetch("/api/board/register", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        // 게시글 등록 성공 시
        alert("게시글이 등록되었습니다.");
        navigate("/community/1"); // 목록 페이지로 이동
      } else {
        // 에러 처리
        const errorText = await response.text(); // 에러 메시지 받아오기
        console.log(`게시글 등록에 실패했습니다.  ${errorText}`);
        alert(`게시글 등록에 실패했습니다.  ${errorText}`);
      }
    } catch (error) {
      console.error("Error registering board:", error);
      alert("게시글 등록 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SubCategories />
      <div className="container mx-auto px-4 py-8 flex flex-grow">
        <main className="flex-grow pr-8">
          <h2 className="text-2xl font-bold mb-4">게시글 등록</h2>
          <form
            onSubmit={handleSubmit}
            className="w-full bg-white p-6 rounded-md shadow-lg"
          >
            <div className="mb-4">
              <label className="block mb-2 text-gray-600">제목</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full border border-gray-300 p-2 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-600">작성자</label>
              <input
                type="text"
                value="user10" // 임의의 값
                readOnly
                className="w-full border border-gray-300 p-2 rounded-md bg-gray-100"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-600">내용</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows="5"
                className="w-full border border-gray-300 p-2 rounded-md h-[400px]"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-600">파일 첨부</label>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="border border-gray-300 p-2 rounded-md"
              />
            </div>
            <div className="flex justify-end items-center">
              <Link
                to={`/community/1`} // 목록 페이지로 돌아가기
                state={{ selectCategory, selectSubCategory }}
                className="text-sky-600 hover:underline mr-4"
              >
                목록으로 돌아가기
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 hover:bg-sky-200 hover:font-bold border rounded-md bg-white text-blue-500 disabled:text-gray-300"
              >
                {loading ? "등록 중..." : "게시글 등록"}
              </button>
            </div>
          </form>
        </main>
        <div className="flex flex-col space-y-4">
          <QuickMenu />
          <ChatBot />
        </div>
      </div>
    </div>
  );
};

export default BoardRegist;
