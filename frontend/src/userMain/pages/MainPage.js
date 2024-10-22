import React, { useEffect, useState } from "react";
import "../style/tailwind.css";
import { Link, useNavigate } from "react-router-dom";

const HospitalHomepage = () => {
  const imageCount = 4; // 이미지 개수
  //이미지 번호
  const [currentIndex, setCurrentIndex] = useState(0);
  //바로가기 값들
  const [contentItems, setContentItems] = useState([]);
  //병원 후기 글 정보
  const [boards, setBoards] = useState([]);
  //공지사항 글
  const [notices, setNotices] = useState([]);
  const navigate = useNavigate(); // useNavigate 훅 사용
  useEffect(() => {
    //바로가기 값 불러오기
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/category/main");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const contents = await response.json();
        // 필요한 카테고리 ID 목록
        const contentsIds = [110, 100, 121, 103];
        // 카테고리 이름 매핑
        const contentsNames = {
          110: "간편예약",
          100: "진료과/의료진 검색",
          121: "증명서 발급",
          103: "이용안내"
        };
        const contentsInfo = {
          110: "쉽고 편하게 진료 예약을 할 수 있습니다.",
          100: "원하는 진료과 또는 의료진을 \n 검색하실 수 있습니다.",
          121: "필요한 증명서를 신청 후 \n 편하게 다운받아 볼 수 있습니다",
          103: "병원 위치 및 예약 가능 시간을 \n 확인 할 수 있습니다"
        };
        const btnName = {
          110: "예약하기",
          100: "검색하기",
          121: "발급하기",
          103: "이동하기"
        };
        // selectedCategoryIds 순서대로 아이템 생성
        const items = contentsIds.map((id) => {
          const content = contents.find((category) => category.categoryId === id);
          if (content) {
            const subCategory = content.subcategories && content.subcategories[0];
            return {
              contentName: contentsNames[content.categoryId],
              contentsInfo: contentsInfo[content.categoryId],
              path: `/${content.urlName}`,
              categoryName: content.name,
              subCategoryName: subCategory ? subCategory.name : "",
              btnName: btnName[content.categoryId] || ""
            };
          } else {
            const subCategoryParent = contents.find((content) =>
              content.subcategories.some((sub) => sub.categoryId === id)
            );
            if (subCategoryParent) {
              const foundSub = subCategoryParent.subcategories.find((sub) => sub.categoryId === id);
              return {
                contentName: foundSub ? foundSub.name : contentsNames[id],
                contentsInfo: contentsInfo[id],
                path: `/${foundSub ? foundSub.urlName : ""}`,
                categoryName: subCategoryParent.name,
                subCategoryName: foundSub ? foundSub.name : "",
                btnName: btnName[id] || ""
              };
            }
          }
          return null;
        }).filter((item) => item !== null);
        setContentItems(items); // 잘 필터링된 아이템을 상태에 설정
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
    fetchBoards();
    fetchNotices();
  }, []);

  // 이미지 슬라이드 효과
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageCount);
    }, 3500); // 3초마다 이미지 변경

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 interval 클리어
  }, []);

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  //후기글 정보
  // 게시글(병원후기) 정보 가져오기
  const fetchBoards = async () => {
    const response = await fetch("/api/board/all");
    const data = await response.json();
    //게시글 5개만 가져오기
    const limitedData = data.length > 5 ? data.slice(0, 5) : data;
    // 날짜 포맷 변환
    const formattedData = limitedData.map((board) => ({
      ...board,
      createAt:board.updateAt? formatDate(board.updateAt): formatDate(board.createAt)// 날짜 포맷 변경
    }));
    setBoards(formattedData); // 변환된 데이터로 상태 업데이트
  };

  // 게시글 정보 가져오기
  const fetchNotices = async () => {
    const response = await fetch("/api/board/allNotice");
    const data = await response.json();
    //공지사항 5개만 가져오기
    const limitedData = data.length > 5 ? data.slice(0, 5) : data;
    console.log("공지사항 확인용", limitedData);
    // 날짜 포맷 변환
    const formattedData = limitedData.map((board) => ({
      ...board,
      createAt:board.updateAt? formatDate(board.updateAt): formatDate(board.createAt) // 날짜 포맷 변경
    }));
    setNotices(formattedData); // 변환된 데이터로 상태 업데이트
  };

  // 날짜 포맷 변환 함수
  const formatDate = (timestamp) => {
    const date = new Date(timestamp); // timestamp를 Date 객체로 변환
    const year = date.getFullYear(); // 연도
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월 (0부터 시작하므로 1 추가)
    const day = String(date.getDate()).padStart(2, "0"); // 일
    return `${year}-${month}-${day}`; // 형식: YYYY-MM-DD
  };


  return (
    <div className="flex flex-col min-h-screen bg-sky-50">
      <main className="flex-grow container mx-auto px-4 py-8">
        {/*배너*/}
        <div className="relative overflow-hidden h-80"> {/* 높이를 설정 */}
          {Array.from({ length: imageCount }, (_, index) => (
            <div key={index} className="absolute inset-0">
              <img
                src={`/images/banner/${index + 1}.png`} // 동적으로 이미지 경로 생성
                className={`w-full object-cover transition-opacity duration-700 ease-in-out  rounded-[10px] ${
                  currentIndex === index
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-full" // 왼쪽으로 이동 
                }`}
                alt={`배너${index + 1}`}
              />
              {/*배너 이미지 클릭 버튼*/}
              <div
                className="absolute mt-2 left-1/2 transform -translate-x-1/2 flex space-x-2 "> {/* 버튼을 하단 중앙에 위치 */}
                {Array.from({ length: imageCount }, (_, btnIndex) => (
                  <button
                    key={btnIndex}
                    className={`w-3 h-3 rounded-full ${
                      currentIndex === btnIndex ? "bg-blue-600" : "bg-gray-400"
                    }`}
                    onClick={() => goToImage(btnIndex)} // 클릭 이벤트 작동
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* 바로가기 메뉴? */}
        <div className="grid grid-cols-4 gap-4 ">
          {contentItems.map((item, index) => (
            <>
              <div key={index} className="flex flex-col items-center justify-center rounded-lg bg-white shadow-md p-4">
                <div className="text-center mt-8 text-sky-700 font-bold text-lg mb-2"
                     style={{ flex: "0 0 20%" }}>{item.contentName} </div>
                <div className="text-center text-gray-600 mb-4" style={{ flex: "0 0 40%" }} dangerouslySetInnerHTML={{
                  __html: `● ${item.contentsInfo.replace(/\n/g, "<br />")}`
                }}></div>
                <Link
                  key={index}
                  to={item.path}
                  state={{
                    selectCategory: item.categoryName,
                    selectSubCategory: item.subCategoryName
                  }}
                  className="px-4 hover:bg-sky-200 hover:font-bold py-2 mb-4 border rounded-md bg-white text-blue-500 disabled:text-gray-300"
                >
                  {item.btnName}
                </Link>
              </div>
            </>
          ))}
        </div>
        <hr className="border-[3px] border-dashed border-sky-200 mb-4 mt-10" />
        {/* 컨텐츠[공지사항/커뮤니티 등] */}
        <div className="grid grid-cols-2 grid-rows-2 gap-4 mt-10">
          {/* 커뮤니티(병원후기) */}
          <div className="flex flex-col justify-center rounded-lg bg-white shadow-md p-4">
            <div
              className="text-center mt-3 text-sky-700 font-bold text-lg pb-3 border-b-2 border-blue-700 w-full">커뮤니티
            </div>
            <div className="text-gray-600 mb-4 mt-2 w-full">
              {boards.length > 0 ? (
                <>
                  {boards.map((board) => (
                    <div key={board.id} className="border-b border-blue-200 w-full px-4 py-2 h-12 flex">
                      <div className="w-3/5">제목:
                        <Link
                          to={`/board/detail/${board.boardId}`} // 제목 클릭 시 이동할 경로
                          state={{ selectCategory:"커뮤니티", selectSubCategory:"진료 후기" }} // 카테고리 값 넘겨주기
                          className="text-blue-500 hover:underline"
                        >
                          <span className="ml-2">{board.title}</span>
                        </Link>
                      </div>
                      <div className="w-1/5 text-center">작성자: <span className="ml-2 text-sky-400">{board.userId}</span>
                      </div>
                      <div className="w-2/5 text-center">작성일: <span
                        className="ml-2 text-sky-400"> {board.updateAt ? formatDate(board.updateAt) : formatDate(board.createAt)}</span>
                      </div>
                    </div>
                  ))}
                </>
              ) : "게시글 불러오는 중"}
            </div>
            <Link
              to="/community"
              state={{ selectCategory:"커뮤니티", selectSubCategory:"진료 후기" }}
              className="px-4 text-right hover:font-bold py-2 text-blue-500"
            >
              더보기
            </Link>
          </div>
          {/* 공지사항*/}
          <div className="flex flex-col justify-center rounded-lg bg-white shadow-md p-4">
            <div className="text-center mt-3 text-sky-700 font-bold text-lg pb-3 border-b-2 border-blue-700 w-full">공지사항</div>
            <div className="text-gray-600mb-4 mt-2 w-full">
              {notices.length>0?(
                <>
                  {notices.map((notice) => (
                    <div key={notice.id} className="border-b border-blue-200 w-full px-4 py-2 h-12 flex">
                      <div className="w-3/5">제목:
                        <Link
                          to={`/notice/detail/${notice.boardId}`} // 제목 클릭 시 이동할 경로
                          state={{ selectCategory:"커뮤니티", selectSubCategory:"공지사항" }} // 카테고리 값 넘겨주기
                          className="text-blue-500 hover:underline">
                          <span className="ml-2">{notice.title}</span>
                        </Link>
                      </div>
                      <div className="w-2/5 text-center">작성일: <span
                        className="ml-2 text-sky-400"> {notice.createAt}</span>
                      </div>
                    </div>
                  ))}
                </>
              ) : "공지사항 불러오는 중"}
            </div>
            <Link
              to="/notice"
              state={{ selectCategory:"커뮤니티", selectSubCategory:"공지사항" }}
              className="px-4 text-right hover:font-bold py-2 text-blue-500"
            >
              더보기
            </Link>
          </div>


          {/* 병원정보*/}
          <div className="flex flex-col justify-center rounded-lg bg-white shadow-md p-4">
            <div className="text-center mt-3 text-sky-700 font-bold text-lgpb-3 border-b-2 border-blue-700 w-full">병원정보</div>
            <div className="text-center text-gray-600 mb-4"></div>
            <Link
              to="/emergency-contact"
              className="px-4 hover:bg-sky-200 hover:font-bold py-2 mb-4 border rounded-md bg-white text-blue-500"
            >
              이동
            </Link>
          </div>
          {/* FAQ*/}
          <div className="flex flex-col items-center justify-center rounded-lg bg-white shadow-md p-4">
            <div className="text-center mt-8 text-sky-700 font-bold text-lg mb-2">FAQ 자주하는 질문</div>
            <div className="text-center text-gray-600 mb-4"></div>
            <Link
              to="/emergency-contact"
              className="px-4 hover:bg-sky-200 hover:font-bold py-2 mb-4 border rounded-md bg-white text-blue-500"
            >
              이동
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
};

export default HospitalHomepage;
