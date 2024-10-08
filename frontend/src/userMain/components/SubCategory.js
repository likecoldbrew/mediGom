import React from "react";
import { useParams } from "react-router-dom";

const categories = [
  {
    name: "진료안내",
    subcategories: [
      { name: "의료진", path: "1001" },
      { name: "진료과", path: "1002" },
      { name: "병원안내", path: "1003" },
    ],
  },
  {
    name: "진료예약",
    subcategories: [
      { name: "온라인예약", path: "2001" },
      { name: "AI추천", path: "2002" },
    ],
  },
  {
    name: "증명서 발급",
    subcategories: [{ name: "증명서 발급", path: "3001" }],
  },
  {
    name: "커뮤니티",
    subcategories: [
      { name: "진료 후기", path: "4001" },
      { name: "공지사항", path: "4002" },
      { name: "FAQ", path: "4003" },
      { name: "1대1 문의", path: "4004" },
    ],
  },
  {
    name: "마이페이지",
    subcategories: [
      { name: "내 정보", path: "5001" },
      { name: "처방 내역", path: "5002" },
      { name: "증명서 신청 내역", path: "5003" },
    ],
  },
];

const SubCategories = ({ selectCategory, selectSubCategory }) => {
  const { subcategory } = useParams(); // URL에서 서브카테고리 가져오기

  // 카테고리명 가져오기
  const categoryObj = categories.find(cat =>
      cat.subcategories.some(sub => sub.path === subcategory)
  );

  const subcategoryObj = categoryObj ? categoryObj.subcategories.find(sub => sub.path === subcategory) : null;

  return (
      <div className="flex flex-col min-h-screen bg-white">
        <div className="w-full bg-sky-100 py-2 border-y border-sky-200">
          <div className="container mx-auto px-4">
            <p className="text-sky-800 font-semibold">
              {categoryObj.name } | {subcategoryObj.name}
            </p>
          </div>
        </div>
      </div>
  );
};

export default SubCategories;
