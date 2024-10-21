import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const QuickMenu = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [sidebarItems, setSidebarItems] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/category/main");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const categories = await response.json();
        // 필요한 카테고리 ID 목록
        const selectedCategoryIds = [110, 100, 121, 103];
        // 아이콘 매핑
        const icons = {
          110: "🗓️", // 간편예약
          100: "🔍", // 진료과/의료진 검색
          121: "📄", // 증명서 발급
          103: "ℹ️", // 이용안내
        };
        // 카테고리 이름 매핑
        const categoryNames = {
          110: "간편예약",
          100: "진료과/의료진 검색",
          121: "증명서 발급",
          103: "이용안내",
        };
        // selectedCategoryIds 순서대로 아이템 생성
        const items = selectedCategoryIds
          .map(id => {
            // 첫 번째 카테고리를 찾기
            const category = categories.find(category => category.categoryId === id);

            if (category) {
              return {
                name:  categoryNames[category.categoryId],
                icon: icons[category.categoryId],
                path: `/${category.urlName}`,
              };
            } else {
              // 서브카테고리에서 찾기
              const subCategory = categories.find(category =>
                category.subcategories.some(sub => sub.categoryId === id)
              );

              if (subCategory) {
                const foundSub = subCategory.subcategories.find(sub => sub.categoryId === id);
                return {
                  name: foundSub ? foundSub.name : null,
                  icon: icons[id],
                  path: `/${foundSub ? foundSub.urlName : ''}`,
                };
              }
            }
            return null; // 해당 카테고리가 없는 경우 null 반환
          })
          .filter(item => item && item.name); // null 또는 이름이 없는 아이템을 필터링

        setSidebarItems(items);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  const handleNavigation = (path) => {
    navigate(path); // path로 이동
  };
  return (
    <div className="sticky top-10 right-4 bg-sky-100 rounded-lg p-4 shadow-md h-60">
      <div className="space-y-4 h-full  overflow-y-auto">
        {sidebarItems.map((item, index) => (
          <button
            key={index}
            onClick={() => handleNavigation(item.path)}
            className="w-full bg-white  hover:bg-sky-200 text-sky-800 font-bold py-2 px-4 rounded flex items-center justify-center transition-colors"
          >
            <span className="mr-2">{item.icon}</span>
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};
export default QuickMenu;
