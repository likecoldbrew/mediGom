import React from "react";
import { useParams, useLocation } from "react-router-dom";

const SubCategories = () => {
  const { subcategory } = useParams(); // URL에서 서브카테고리 가져오기
  const location = useLocation();
  const { selectCategory, selectSubCategory } = location.state || {};

  return (
    <div className="flex flex-col bg-white">
      <div className="w-full bg-sky-100 py-2 border-y border-sky-200">
        <div className="container mx-auto px-4">
          <p className="text-sky-800 font-semibold">
            {selectCategory} | {selectSubCategory}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubCategories;
