import React, { useEffect, useState } from "react";
import "../style/tailwind.css";
import { Link, useNavigate } from "react-router-dom";

const HospitalHomepage = () => {
  const imageCount = 4; // 이미지 개수
  const [currentIndex, setCurrentIndex] = useState(0);
  const [contentItems, setContentItems] = useState([]);
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
        // selectedCategoryIds 순서대로 아이템 생성
        console.log("Contents:", contents);
        contents.forEach(content => {
          console.log(`Category ID: ${content.categoryId}, Subcategories:`, content.subcategories);
        });
        const items = contentsIds.map((id) => {
          const content = contents.find((category) => category.categoryId === id);
          if (content) {
            const subCategory = content.subcategories && content.subcategories[0];
            return {
              contentName: contentsNames[content.categoryId],
              contentsInfo: contentsInfo[content.categoryId],
              path: `/${content.urlName}`,
              categoryName: content.name,
              subCategoryName: subCategory ? subCategory.name : ""
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
                subCategoryName: foundSub ? foundSub.name : ""
              };
            }
          }
          return null;
        }).filter((item) => item !== null);
        console.log("item", items)
        setContentItems(items); // 잘 필터링된 아이템을 상태에 설정
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
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
        {/* 둥근 네모 박스 4개 추가 */}
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
                  이동
                </Link>
              </div>
            </>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HospitalHomepage;
